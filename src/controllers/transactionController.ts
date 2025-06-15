import { Request, Response } from 'express';
import { Decimal } from 'decimal.js';
import Prisma from '../config/prisma.js';

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const { cashierId, transactionTypeId, startDate, endDate, limit = '10', page = '1' } = req.query;

    const parsedLimit = parseInt(limit as string, 10);
    const parsedPage = parseInt(page as string, 10);
    const skip = (parsedPage - 1) * parsedLimit;

    const where: any = {};
    if (cashierId) {
      where.cashierId = parseInt(cashierId as string, 10);
    }
    if (transactionTypeId) {
      where.transactionTypeId = parseInt(transactionTypeId as string, 10);
    }
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate as string);
      }
      if (endDate) {
        // Tambahkan 1 hari untuk mencakup seluruh endDate
        const end = new Date(endDate as string);
        end.setDate(end.getDate() + 1);
        where.createdAt.lt = end;
      }
    }

    const [transactions, totalTransactions] = await Prisma.$transaction([
      Prisma.transaction.findMany({
        where,
        skip: skip,
        take: parsedLimit,
        include: {
          transactionType: { select: { id: true, name: true } },
          items: {
            include: {
              product: { select: { id: true, name: true } }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      Prisma.transaction.count({ where }),
    ]);

    res.json({
      transactions,
      total: totalTransactions,
      page: parsedPage,
      pages: Math.ceil(totalTransactions / parsedLimit),
    });
  } catch (err: any) {
    console.error('Error getting all transactions:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transactionDbId = parseInt(req.params.id, 10); // ID dari database (auto-increment)

    if (isNaN(transactionDbId)) {
      return res.status(400).json({ msg: 'Invalid Transaction ID format. Must be an integer.' });
    }

    const transaction = await Prisma.transaction.findUnique({
      where: { id: transactionDbId },
      include: {
        transactionType: { select: { id: true, name: true } },
        items: {
          include: {
            product: { select: { id: true, name: true } }
          }
        }
      }
    });

    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found.' });
    }

    res.json(transaction);
  } catch (err: any) {
    console.error('Error getting transaction by ID:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  // req.body sudah divalidasi oleh Joi (transactionInputSchema)
  const { items, paymentMethod, amountPaid, transactionTypeId } = req.body;

  try {
    // Validasi dan ambil detail transactionType
    const transactionType = await Prisma.transactionType.findUnique({
      where: { id: transactionTypeId },
    });

    if (!transactionType) {
      return res.status(400).json({ msg: 'Invalid transaction type selected.' });
    }

    // Gunakan transaksi database untuk memastikan atomisitas (semua berhasil atau tidak sama sekali)
    const newTransaction = await Prisma.$transaction(async (prismaTransaction) => {
      let totalAmountDecimal = new Decimal(0);
      const transactionItemsData: any[] = []; // Data untuk TransactionItem

      // 1. Verifikasi produk dan hitung total jumlah
      for (const item of items) {
        const product = await prismaTransaction.product.findUnique({
          where: { id: item.productId },
          include: {
            priceHistory: {
              orderBy: { startDate: 'desc' },
              take: 1
            }
          }
        });

        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found.`);
        }

        // Ambil harga terbaru dari priceHistory
        if (!product.priceHistory || product.priceHistory.length === 0) {
          throw new Error(`Product with ID ${item.productId} has no defined price.`);
        }
        const currentPrice = new Decimal(product.priceHistory[0].price.toString());


        const subtotal = currentPrice.times(item.quantity);
        totalAmountDecimal = totalAmountDecimal.plus(subtotal);

        transactionItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: currentPrice, // Harga produk saat transaksi
          subtotal: subtotal,
          discount: new Decimal(0), // Diskon per item, jika ada di Joi input, ambil dari sana
          originalPrice: currentPrice, // Original price tanpa diskon item
        });
      }

      // TODO: Logika untuk totalDiscount dan taxAmount jika ada
      // Misalnya: totalAmountDecimal = totalAmountDecimal.minus(totalDiscount).plus(taxAmount);

      // 2. Buat ID Transaksi unik (contoh sederhana)
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      const datePrefix = `${year}${month}${day}`;

      // Ambil nomor transaksi terakhir hari ini untuk incremental
      const lastTransactionToday = await prismaTransaction.transaction.findFirst({
        where: { transactionId: { startsWith: `INV-${datePrefix}` } },
        orderBy: { transactionId: 'desc' },
        select: { transactionId: true }
      });

      let nextTransactionNumber = 1;
      if (lastTransactionToday) {
        const lastNum = parseInt(lastTransactionToday.transactionId!.split('-')[2]);
        if (!isNaN(lastNum)) {
          nextTransactionNumber = lastNum + 1;
        }
      }
      const transactionId = `INV-${datePrefix}-${nextTransactionNumber.toString().padStart(3, '0')}`;


      // 3. Hitung changeDue
      const amountPaidDecimal = new Decimal(amountPaid);
      const changeDueDecimal = amountPaidDecimal.minus(totalAmountDecimal);


      // 4. Buat transaksi utama
      const transaction = await prismaTransaction.transaction.create({
        data: {
          transactionId: transactionId,
          transactionTypeId: transactionTypeId,
          totalAmount: totalAmountDecimal,
          paymentMethod: paymentMethod,
          amountPaid: amountPaidDecimal,
          changeDue: changeDueDecimal,
          status: 'COMPLETED', // Atau sesuaikan dengan input jika ada
          items: {
            createMany: {
              data: transactionItemsData
            }
          }
        },
        include: { // Mengambil data relasi untuk respons
          transactionType: { select: { id: true, name: true } },
          items: {
            include: {
              product: { select: { id: true, name: true } }
            }
          }
        }
      });

      return transaction;
    });

    res.status(201).json(newTransaction);

  } catch (err: any) {
    console.error('Error creating transaction:', err.message || err);
    // Tangani error dari throw new Error() atau Prisma
    if (err.message.includes('Product with ID') || err.message.includes('Insufficient stock') || err.message.includes('Amount paid')) {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

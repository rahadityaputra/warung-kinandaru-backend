import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Decimal } from 'decimal.js'; // Untuk penanganan tipe uang yang presisi
import Prisma from '../config/prisma.js'; // Import Prisma Client

// Catatan: Validasi input dilakukan di middleware (validateRequest.ts) menggunakan Joi.
// Controller ini mengasumsikan input sudah valid.

export const createProductSupplier = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId, 10);
  // req.body sudah divalidasi oleh Joi (createProductSupplierSchema)
  const { supplierId, supplierSku, unitCost, minOrderQuantity, leadTimeDays } = req.body;

  try {
    if (isNaN(productId)) {
      return res.status(400).json({ msg: 'Invalid Product ID format. Must be an integer.' });
    }

    // Cek apakah produk dan supplier ada
    const [productExists, supplierExists] = await Prisma.$transaction([
      Prisma.product.findUnique({ where: { id: productId }, select: { id: true } }),
      Prisma.supplier.findUnique({ where: { id: supplierId }, select: { id: true } }),
    ]);

    if (!productExists) {
      return res.status(404).json({ msg: `Product with ID ${productId} not found.` });
    }
    if (!supplierExists) {
      return res.status(404).json({ msg: `Supplier with ID ${supplierId} not found.` });
    }

    const newProductSupplier = await Prisma.productSupplier.create({
      data: {
        productId: productId,
        supplierId: supplierId,
        supplierSku: supplierSku || null,
        unitCost: new Decimal(unitCost), // Pastikan ini dikonversi ke Decimal.js
        minOrderQuantity: minOrderQuantity || null,
        leadTimeDays: leadTimeDays || null,
      },
      include: {
        product: { select: { id: true, name: true } },
        supplier: { select: { id: true, name: true, contactPerson: true } },
      },
    });
    res.status(201).json(newProductSupplier);

  } catch (err) {
    console.error('Error creating product-supplier link:', err);
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      // P2002: Unique constraint violation (productId_supplierId sudah ada)
      return res.status(400).json({ msg: 'Product is already linked to this supplier.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const updateProductSupplier = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId, 10);
  const supplierId = parseInt(req.params.supplierId, 10);
  // req.body sudah divalidasi oleh Joi (updateProductSupplierSchema)
  const { supplierSku, unitCost, minOrderQuantity, leadTimeDays } = req.body;

  try {
    if (isNaN(productId) || isNaN(supplierId)) {
      return res.status(400).json({ msg: 'Invalid Product ID or Supplier ID format. Must be integers.' });
    }

    const existingLink = await Prisma.productSupplier.findUnique({
      where: {
        productId_supplierId: { // Menggunakan composite unique key
          productId: productId,
          supplierId: supplierId,
        },
      },
    });

    if (!existingLink) {
      return res.status(404).json({ msg: 'Product-supplier link not found.' });
    }

    const updatedLink = await Prisma.productSupplier.update({
      where: {
        productId_supplierId: {
          productId: productId,
          supplierId: supplierId,
        },
      },
      data: {
        supplierSku: supplierSku === undefined ? existingLink.supplierSku : supplierSku || null,
        unitCost: unitCost === undefined ? existingLink.unitCost : new Decimal(unitCost), // Konversi ke Decimal.js
        minOrderQuantity: minOrderQuantity === undefined ? existingLink.minOrderQuantity : minOrderQuantity || null,
        leadTimeDays: leadTimeDays === undefined ? existingLink.leadTimeDays : leadTimeDays || null,
      },
      include: {
        product: { select: { id: true, name: true } },
        supplier: { select: { id: true, name: true, contactPerson: true } },
      },
    });

    res.json(updatedLink);

  } catch (err) {
    console.error('Error updating product-supplier link:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const deleteProductSupplier = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId, 10);
  const supplierId = parseInt(req.params.supplierId, 10);

  try {
    if (isNaN(productId) || isNaN(supplierId)) {
      return res.status(400).json({ msg: 'Invalid Product ID or Supplier ID format. Must be integers.' });
    }

    const existingLink = await Prisma.productSupplier.findUnique({
      where: {
        productId_supplierId: { // Menggunakan composite unique key
          productId: productId,
          supplierId: supplierId,
        },
      },
    });

    if (!existingLink) {
      return res.status(404).json({ msg: 'Product-supplier link not found.' });
    }

    await Prisma.productSupplier.delete({
      where: {
        productId_supplierId: {
          productId: productId,
          supplierId: supplierId,
        },
      },
    });

    res.status(200).json({ msg: 'Product-supplier link removed successfully.' });
  } catch (err: any) {
    console.error('Error deleting product-supplier link:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

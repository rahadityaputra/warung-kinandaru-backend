import { Request, Response } from 'express';
import { Decimal } from 'decimal.js';
import Prisma from '../config/prisma.js';

export const getAllProductPriceHistories = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  try {
    if (isNaN(productId)) {
      return res.status(400).json({ msg: 'Invalid Product ID format. Must be an integer.' });
    }

    const existingProduct = await Prisma.product.findUnique({
      where: { id: productId },
      include: {
        priceHistory: {
          orderBy: { startDate: 'desc' },
          take: 1
        }
      }
    });

    if (!existingProduct) {
      return res.status(404).json({ msg: 'Product not found.' });
    }


    const productPriceHistories = await Prisma.productPriceHistory.findMany({
      where: {
        productId: productId
      }
    })

    return res.status(200).json({
      productPriceHistories
    })

  } catch (error) {
    console.error('Error get price histories of product:', error);
    res.status(500).json({ msg: 'Server Error' });
  }

}
export const addProductPriceEntry = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId, 10);
  const { price } = req.body;


  try {
    if (isNaN(productId)) {
      return res.status(400).json({ msg: 'Invalid Product ID format. Must be an integer.' });
    }

    const existingProduct = await Prisma.product.findUnique({
      where: { id: productId },
      include: {
        priceHistory: {
          orderBy: { startDate: 'desc' },
          take: 1
        }
      }
    });

    if (!existingProduct) {
      return res.status(404).json({ msg: 'Product not found.' });
    }

    const currentPrice = existingProduct.priceHistory.length > 0
      ? new Decimal(existingProduct.priceHistory[0].price.toString())
      : null;
    const newPriceDecimal = new Decimal(price);


    if (currentPrice && currentPrice.eq(newPriceDecimal)) {
      return res.status(200).json({ msg: 'Price is the same as current price. No update performed.' });
    }

    const newPriceHistoryEntry = await Prisma.$transaction(async (prismaTransaction) => {

      if (currentPrice) {
        await prismaTransaction.productPriceHistory.updateMany({
          where: {
            productId: productId,
            endDate: null
          },
          data: {
            endDate: new Date()
          }
        });
      }

      const entry = await prismaTransaction.productPriceHistory.create({
        data: {
          productId: productId,
          price: newPriceDecimal,
          startDate: new Date(),
        },
      });

      return entry;
    });

    res.status(201).json(newPriceHistoryEntry);

  } catch (err) {
    console.error('Error adding product price entry:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

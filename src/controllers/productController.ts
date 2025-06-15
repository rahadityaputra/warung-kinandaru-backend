import { Request, Response } from "express";
import Prisma from "../config/prisma";
import Decimal from "decimal.js";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";


const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = Prisma.product.findMany({
      include: {
        category: true,
        priceHistory: {
          orderBy: { startDate: 'desc' },
          take: 1
        }
      }
    });
    res.json({
      products
    })
    return;

  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }

}

const createProduct = async (req: Request, res: Response) => {
  const { name, description, stock, imageUrl, category, price } = req.body;

  try {
    const newProduct = await Prisma.product.create({
      data: {
        name: name,
        description: description,
        stock: stock,
        imageUrl: imageUrl,
        categoryId: category,
      },
    });

    if (price) {
      await Prisma.productPriceHistory.create({
        data: {
          productId: newProduct.id,
          price: price,
          startDate: new Date(),
        },
      });
    }

    res.status(201).json(newProduct);
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      return res.status(400).json({ msg: 'Product with this name already exists.' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
      return res.status(400).json({ msg: 'Invalid Product ID format. Must be an integer.' });
    }

    const product = await Prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: {
          select: { id: true, name: true }
        },
        priceHistory: {
          orderBy: { startDate: 'desc' },
          take: 1,
          select: { price: true }
        }
      },
    });

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const formattedProduct = {
      ...product,
      currentPrice: product.priceHistory.length > 0 ? new Decimal(product.priceHistory[0].price.toString()) : null,
      priceHistory: undefined
    };

    res.json(formattedProduct);
  } catch (err: any) {
    console.error('Error getting product by ID:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};


const updateProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id, 10);
  // req.body sudah divalidasi oleh Joi (updateProductSchema)
  const { name, description, stock, imageUrl, categoryId, price } = req.body;

  try {
    if (isNaN(productId)) {
      return res.status(400).json({ msg: 'Invalid Product ID format. Must be an integer.' });
    }

    const existingProduct = await Prisma.product.findUnique({
      where: { id: productId },
      include: { priceHistory: { orderBy: { startDate: 'desc' }, take: 1 } }
    });

    if (!existingProduct) {
      return res.status(404).json({ msg: 'Product not found.' });
    }

    if (categoryId !== undefined && categoryId !== existingProduct.categoryId) {
      const newCategoryExists = await Prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!newCategoryExists) {
        return res.status(400).json({ msg: 'New category not found.' });
      }
    }

    const productDataToUpdate: {
      name?: string;
      description?: string | null;
      stock?: number;
      imageUrl?: string | null;
      categoryId?: number;
    } = {};

    if (name !== undefined) productDataToUpdate.name = name;
    if (description !== undefined) productDataToUpdate.description = description;
    if (stock !== undefined) productDataToUpdate.stock = stock;
    if (imageUrl !== undefined) productDataToUpdate.imageUrl = imageUrl;
    if (categoryId !== undefined) productDataToUpdate.categoryId = categoryId;


    const updatedProduct = await Prisma.$transaction(async (prismaTransaction) => {
      const product = await prismaTransaction.product.update({
        where: { id: productId },
        data: productDataToUpdate,
      });

      if (price !== undefined) {
        const currentPrice = existingProduct.priceHistory.length > 0 ? new Decimal(existingProduct.priceHistory[0].price.toString()) : null;
        const newPriceDecimal = new Decimal(price);

        if (!currentPrice || !currentPrice.eq(newPriceDecimal)) {
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

          await prismaTransaction.productPriceHistory.create({
            data: {
              productId: productId,
              price: newPriceDecimal,
              startDate: new Date(),
            },
          });
        }
      }
      return product;
    });


    const productWithLatestPrice = await Prisma.product.findUnique({
      where: { id: updatedProduct.id },
      include: {
        category: { select: { id: true, name: true } },
        priceHistory: {
          orderBy: { startDate: 'desc' },
          take: 1,
          select: { price: true }
        }
      }
    });

    const formattedUpdatedProduct = {
      ...productWithLatestPrice,
    };

    res.json(formattedUpdatedProduct);

  } catch (err) {
    console.error('Error updating product:', err);
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      // Error kode P2002 (Unique constraint violation)
      return res.status(400).json({ msg: 'Product name already exists.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  try {
    if (isNaN(productId)) {
      return res.status(400).json({ msg: 'Invalid Product ID format. Must be an integer.' });
    }

    await Prisma.product.delete({
      where: {
        id: productId
      }
    })

    const product = await Prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ msg: 'Product not found.' });
    }

    res.status(200).json({
      msg: "product removed successfully"
    })

  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }

}

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}

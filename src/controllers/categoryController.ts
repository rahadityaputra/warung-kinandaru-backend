import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import Prisma from '../config/prisma.js';

export const getAllCategories = async (_: Request, res: Response) => {
  try {
    const categories = await Prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(categories);
  } catch (err: any) {
    console.error('Error getting all categories:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id, 10);

    if (isNaN(categoryId)) {
      return res.status(400).json({ msg: 'Invalid Category ID format. Must be an integer.' });
    }

    const category = await Prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return res.status(404).json({ msg: 'Category not found.' });
    }

    res.json(category);
  } catch (err: any) {
    console.error('Error getting category by ID:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const newCategory = await Prisma.category.create({
      data: {
        name: name,
      },
    });
    res.status(201).json(newCategory);
  } catch (err) {
    console.error('Error creating category:', err);
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      // P2002: Unique constraint violation (nama kategori duplikat)
      return res.status(400).json({ msg: 'Category with this name already exists.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id, 10);
  const { name } = req.body;

  try {
    if (isNaN(categoryId)) {
      return res.status(400).json({ msg: 'Invalid Category ID format. Must be an integer.' });
    }

    const existingCategory = await Prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!existingCategory) {
      return res.status(404).json({ msg: 'Category not found.' });
    }

    const updatedCategory = await Prisma.category.update({
      where: { id: categoryId },
      data: {
        name: name,
      },
    });
    res.json(updatedCategory);
  } catch (err) {
    console.error('Error updating category:', err);
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      // P2002: Unique constraint violation (nama kategori duplikat)
      return res.status(400).json({ msg: 'Category with this name already exists.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id, 10);

  try {
    if (isNaN(categoryId)) {
      return res.status(400).json({ msg: 'Invalid Category ID format. Must be an integer.' });
    }

    const category = await Prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ msg: 'Category not found.' });
    }

    await Prisma.category.delete({
      where: { id: categoryId },
    });

    res.status(200).json({ msg: 'Category removed successfully.' });
  } catch (err) {
    console.error('Error deleting category:', err);
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2003') {
      return res.status(400).json({ msg: 'Cannot delete category: It is still referenced by existing products. Please update or delete products in this category first.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

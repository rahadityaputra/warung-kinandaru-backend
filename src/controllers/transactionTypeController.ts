import { Request, Response } from 'express';
import Prisma from '../config/prisma.js'; // Import Prisma Client
import { PrismaClientKnownRequestError } from '../generated/prisma/runtime/library';

export const getAllTransactionTypes = async (_: Request, res: Response) => {
  try {
    const transactionTypes = await Prisma.transactionType.findMany({
      orderBy: { name: 'asc' } // Urutkan berdasarkan nama jenis transaksi
    });
    res.json(transactionTypes);
  } catch (err: any) {
    console.error('Error getting all transaction types:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const getTransactionTypeById = async (req: Request, res: Response) => {
  try {
    const typeId = parseInt(req.params.id, 10);

    if (isNaN(typeId)) {
      return res.status(400).json({ msg: 'Invalid Transaction Type ID format. Must be an integer.' });
    }

    const transactionType = await Prisma.transactionType.findUnique({
      where: { id: typeId }
    });

    if (!transactionType) {
      return res.status(404).json({ msg: 'Transaction type not found.' });
    }

    res.json(transactionType);
  } catch (err: any) {
    console.error('Error getting transaction type by ID:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const createTransactionType = async (req: Request, res: Response) => {
  // req.body sudah divalidasi oleh Joi (createTransactionTypeSchema)
  const { name, description } = req.body;

  try {
    const newTransactionType = await Prisma.transactionType.create({
      data: {
        name: name,
        description: description || null, // Pastikan deskripsi bisa null di DB jika tidak ada
      },
    });
    res.status(201).json(newTransactionType);
  } catch (err: any) {
    console.error('Error creating transaction type:', err);
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      // P2002: Unique constraint violation (nama jenis transaksi duplikat)
      return res.status(400).json({ msg: 'Transaction type with this name already exists.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const updateTransactionType = async (req: Request, res: Response) => {
  const typeId = parseInt(req.params.id, 10);
  // req.body sudah divalidasi oleh Joi (updateTransactionTypeSchema)
  const { name, description, isPositiveStockEffect, isPositiveRevenueEffect } = req.body;

  try {
    if (isNaN(typeId)) {
      return res.status(400).json({ msg: 'Invalid Transaction Type ID format. Must be an integer.' });
    }

    const existingType = await Prisma.transactionType.findUnique({
      where: { id: typeId }
    });

    if (!existingType) {
      return res.status(404).json({ msg: 'Transaction type not found.' });
    }

    const updatedType = await Prisma.transactionType.update({
      where: { id: typeId },
      data: {
        name: name,
        description: description === undefined ? existingType.description : description || null,
      },
    });
    res.json(updatedType);
  } catch (err: any) {
    console.error('Error updating transaction type:', err);
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      // P2002: Unique constraint violation (nama jenis transaksi duplikat)
      return res.status(400).json({ msg: 'Transaction type with this name already exists.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const deleteTransactionType = async (req: Request, res: Response) => {
  const typeId = parseInt(req.params.id, 10);

  try {
    if (isNaN(typeId)) {
      return res.status(400).json({ msg: 'Invalid Transaction Type ID format. Must be an integer.' });
    }

    const transactionType = await Prisma.transactionType.findUnique({
      where: { id: typeId },
    });

    if (!transactionType) {
      return res.status(404).json({ msg: 'Transaction type not found.' });
    }

    await Prisma.transactionType.delete({
      where: { id: typeId },
    });

    res.status(200).json({ msg: 'Transaction type removed successfully.' });
  } catch (err: any) {
    console.error('Error deleting transaction type:', err);
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2003') {
      // P2003: Foreign key constraint failed
      // Ini terjadi jika ada transaksi yang masih mereferensikan jenis transaksi ini
      return res.status(400).json({ msg: 'Cannot delete transaction type: It is still referenced by existing transactions. Please update or delete transactions using this type first.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

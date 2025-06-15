import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import Prisma from '../config/prisma.js';


export const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    const { search, limit = '10', page = '1' } = req.query;

    const parsedLimit = parseInt(limit as string, 10);
    const parsedPage = parseInt(page as string, 10);
    const skip = (parsedPage - 1) * parsedLimit;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { contactPerson: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [suppliers, totalSuppliers] = await Prisma.$transaction([
      Prisma.supplier.findMany({
        where,
        skip: skip,
        take: parsedLimit,
        orderBy: { name: 'asc' } // Urutkan berdasarkan nama supplier
      }),
      Prisma.supplier.count({ where }),
    ]);

    res.json({
      suppliers,
      total: totalSuppliers,
      page: parsedPage,
      pages: Math.ceil(totalSuppliers / parsedLimit),
    });
  } catch (err: any) {
    console.error('Error getting all suppliers:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const supplierId = parseInt(req.params.id, 10);

    if (isNaN(supplierId)) {
      return res.status(400).json({ msg: 'Invalid Supplier ID format. Must be an integer.' });
    }

    const supplier = await Prisma.supplier.findUnique({
      where: { id: supplierId }
    });

    if (!supplier) {
      return res.status(404).json({ msg: 'Supplier not found.' });
    }

    res.json(supplier);
  } catch (err: any) {
    console.error('Error getting supplier by ID:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const createSupplier = async (req: Request, res: Response) => {
  // req.body sudah divalidasi oleh Joi (createSupplierSchema)
  const { name, contactPerson, phone, email, address, notes } = req.body;

  try {
    const newSupplier = await Prisma.supplier.create({
      data: {
        name: name,
        contactPerson: contactPerson || null,
        phone: phone || null,
        email: email || null,
        address: address || null,
        notes: notes || null,
      },
    });
    res.status(201).json(newSupplier);
  } catch (err) {
    console.error('Error creating supplier:', err);
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      // P2002: Unique constraint violation (nama supplier duplikat)
      return res.status(400).json({ msg: 'Supplier with this name already exists.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  const supplierId = parseInt(req.params.id, 10);
  // req.body sudah divalidasi oleh Joi (updateSupplierSchema)
  const { name, contactPerson, phone, email, address, notes } = req.body;

  try {
    if (isNaN(supplierId)) {
      return res.status(400).json({ msg: 'Invalid Supplier ID format. Must be an integer.' });
    }

    const existingSupplier = await Prisma.supplier.findUnique({
      where: { id: supplierId }
    });

    if (!existingSupplier) {
      return res.status(404).json({ msg: 'Supplier not found.' });
    }

    const updatedSupplier = await Prisma.supplier.update({
      where: { id: supplierId },
      data: {
        name: name,
        contactPerson: contactPerson === undefined ? existingSupplier.contactPerson : contactPerson || null,
        phone: phone === undefined ? existingSupplier.phone : phone || null,
        email: email === undefined ? existingSupplier.email : email || null,
        address: address === undefined ? existingSupplier.address : address || null,
        notes: notes === undefined ? existingSupplier.notes : notes || null,
      },
    });
    res.json(updatedSupplier);
  } catch (err) {
    console.error('Error updating supplier:', err);
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      // P2002: Unique constraint violation (nama supplier duplikat)
      return res.status(400).json({ msg: 'Supplier with this name already exists.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  const supplierId = parseInt(req.params.id, 10);

  try {
    if (isNaN(supplierId)) {
      return res.status(400).json({ msg: 'Invalid Supplier ID format. Must be an integer.' });
    }

    const supplier = await Prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!supplier) {
      return res.status(404).json({ msg: 'Supplier not found.' });
    }

    await Prisma.supplier.delete({
      where: { id: supplierId },
    });

    res.status(200).json({ msg: 'Supplier removed successfully.' });
  } catch (err) {
    console.error('Error deleting supplier:', err);
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2003') {
      // P2003: Foreign key constraint failed
      // Ini terjadi jika supplier masih terhubung dengan produk melalui product_suppliers
      return res.status(400).json({ msg: 'Cannot delete supplier: It is still linked to products. Please remove all product links first.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

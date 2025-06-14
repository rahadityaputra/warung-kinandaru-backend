// src/routes/products.ts
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

// import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
// router.post('/', authMiddleware, createProduct); // Contoh: create perlu auth
// router.put('/:id', authMiddleware, updateProduct); // Contoh: update perlu auth
// router.delete('/:id', authMiddleware, deleteProduct); // Contoh: delete perlu auth

export default router;

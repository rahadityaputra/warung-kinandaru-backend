// src/routes/products.ts
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';
import validate from '../middleware/validatorRequest';
import { createProductSchema, updateProductSchema } from '../validation/productValidation';
import { addProductPriceEntry, getAllProductPriceHistories } from '../controllers/productPriceHistoryController';
import { addProductPriceEntrySchema } from '../validation/productPriceHistoryValidation';

const productRouter: Router = Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.get('/:id/price-histories',);
productRouter.post('/', validate(createProductSchema, "body"), createProduct);
productRouter.put('/:id', validate(updateProductSchema, "body"), updateProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.get('/:productId/price-histories', getAllProductPriceHistories);
productRouter.post('/:productId/price-history', validate(addProductPriceEntrySchema, 'body'), addProductPriceEntry);

export default productRouter;

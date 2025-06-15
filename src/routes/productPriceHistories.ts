import { Router } from 'express';
import {
  addProductPriceEntry,
  getAllProductPriceHistories
} from '../controllers/productPriceHistoryController';
import validate from '../middleware/validatorRequest';
import { addProductPriceEntrySchema, getProductPriceHistorySchema } from '../validation/productPriceHistoryValidation';

const productPriceHistoryrouter = Router();


export default productPriceHistoryrouter;

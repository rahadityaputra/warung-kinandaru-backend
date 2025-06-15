import { Router } from "express";
import { createCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/categoryController";
import validate from "../middleware/validatorRequest";
import { createCategorySchema, updateCategorySchema } from "../validation/categoryValidation";

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.post('/', validate(createCategorySchema, 'body'), createCategory);
categoryRouter.put('/:id', validate(updateCategorySchema, 'body'), updateCategory);

export default categoryRouter;

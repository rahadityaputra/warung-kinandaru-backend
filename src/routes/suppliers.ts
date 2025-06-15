import { Router } from "express";
import { createSupplier, deleteSupplier, getAllSuppliers, getSupplierById, updateSupplier } from "../controllers/supplierController";
import validate from "../middleware/validatorRequest";
import { createSupplierSchema, updateSupplierSchema } from "../validation/supplierValidation";

const suppliersRouter = Router();

suppliersRouter.get('/', getAllSuppliers);
suppliersRouter.get('/:id', getSupplierById);
suppliersRouter.post('/', validate(createSupplierSchema, 'body'), createSupplier);
suppliersRouter.put('/:id', validate(updateSupplierSchema, 'body'), updateSupplier);
suppliersRouter.delete('/:id', deleteSupplier);

export default suppliersRouter;

import { Router } from "express";
import { createTransaction, getAllTransactions, getTransactionById } from "../controllers/transactionController";

const transactionRouter = Router();

transactionRouter.get('/', getAllTransactions);
transactionRouter.get('/:id', getTransactionById);
transactionRouter.post('/', createTransaction);

export default transactionRouter;

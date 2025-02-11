import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addNewTransaction } from "../controllers/transactions/add-new-transaction.controller.js";
import { markTransactionAsVoid } from "../controllers/transactions/mark-transaction-as-void.controller.js";
import { getCurrentUserTransactions } from "../controllers/transactions/get-current-user-transactions.controller.js";
import { getRecurringBills } from "../controllers/transactions/get-recurring-bills.controller.js";
import { getTransactionSummary } from "../controllers/transactions/get-transaction-summary.controller.js";

const router = Router();

router
  .route("/")
  .post(verifyJWT, addNewTransaction)
  .get(verifyJWT, getCurrentUserTransactions);
router.route("/:id").patch(verifyJWT, markTransactionAsVoid);
router.get("/recurring-bills", verifyJWT, getRecurringBills);
router.get("/summary", verifyJWT, getTransactionSummary);

export default router;

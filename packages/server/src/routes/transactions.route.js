import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addNewTransaction } from "../controllers/transactions/add-new-transaction.controller.js";
import { markTransactionAsVoid } from "../controllers/transactions/mark-transaction-as-void.controller.js";

const router = Router();

router.route("/").post(verifyJWT, addNewTransaction);
router.route("/:id").patch(verifyJWT, markTransactionAsVoid);

export default router;

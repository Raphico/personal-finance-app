import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addNewTransaction } from "../controllers/transactions/add-new-transaction.controller.js";

const router = Router();

router.route("/").post(verifyJWT, addNewTransaction);

export default router;

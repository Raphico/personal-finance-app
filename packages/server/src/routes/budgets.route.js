import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addNewBudget } from "../controllers/budgets/add-new-budget.controller.js";

const router = Router();

router.route("/").post(verifyJWT, addNewBudget);

export default router;

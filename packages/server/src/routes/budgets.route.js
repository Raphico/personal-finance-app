import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addNewBudget } from "../controllers/budgets/add-new-budget.controller.js";
import { updateBudget } from "../controllers/budgets/update-budget.controller.js";
import { deleteBudget } from "../controllers/budgets/delete-budget.controller.js";
import { getCurrentUserBudgets } from "../controllers/budgets/get-current-user-budgets.controller.js";
import { getBudgetSummary } from "../controllers/budgets/get-budget-summary.controller.js";

const router = Router();

router
  .route("/")
  .post(verifyJWT, addNewBudget)
  .get(verifyJWT, getCurrentUserBudgets);
router
  .route("/:id")
  .patch(verifyJWT, updateBudget)
  .delete(verifyJWT, deleteBudget);
router.get("/summary", verifyJWT, getBudgetSummary);

export default router;

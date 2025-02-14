import { asyncHandler } from "../../utils/async-handler.js";
import { db } from "../../db/index.js";
import { budgets, transactions } from "../../db/schema.js";
import { eq, sql } from "drizzle-orm";
import { ApiResponse } from "../../utils/api-response.js";

export const getBudgetSummary = asyncHandler(
  async function getBudgetSummary(request, response) {
    const budgetSummary = await db
      .select({
        id: budgets.id,
        maximumSpend: budgets.maximumSpend,
        theme: budgets.theme,
        amountSpent: sql`COALESCE(SUM(${transactions.amount}), 0)`,
      })
      .from(budgets)
      .leftJoin(
        transactions,
        sql`cast(${budgets.category} as text) = cast(${transactions.category} as text)`
      )
      .where(eq(budgets.userId, request.user.id))
      .groupBy(budgets.id);

    response.status(200).json(
      new ApiResponse({
        data: budgetSummary,
        message: "budget summary retrieved successfully",
        status: "ok",
      })
    );
  }
);

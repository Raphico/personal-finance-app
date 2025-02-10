import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { budgets } from "../../db/schema.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";

export const getCurrentUserBudgets = asyncHandler(
  async function getCurrentUserBudgets(request, response) {
    const userBudgets = await db
      .select()
      .from(budgets)
      .where(eq(budgets.userId, request.user.id));

    return response.status(200).json(
      new ApiResponse({
        data: {
          budgets: userBudgets,
        },
        message: "budgets retrieved successfully",
        status: "ok",
      })
    );
  }
);

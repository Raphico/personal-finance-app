import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { budgets } from "../../db/schema.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";
import { ApiError } from "../../utils/api-error.js";

export const deleteBudget = asyncHandler(
  async function deleteBudget(request, response) {
    const { id } = request.params;

    const [budget] = await db
      .delete(budgets)
      .where(and(eq(budgets.userId, request.user.id), eq(budgets.id, id)))
      .returning({
        id: budgets.id,
        category: budgets.category,
        maximumSpend: budgets.maximumSpend,
        theme: budgets.theme,
      });

    if (!budget) {
      throw new ApiError({
        message: "budget not found",
        status: 404,
      });
    }

    response.status(200).json(
      new ApiResponse({
        data: budget,
        message: "budget deleted successfully",
        status: "ok",
      })
    );
  }
);

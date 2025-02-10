import { updateBudgetSchema } from "@repo/shared-validators/budgets";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiError } from "../../utils/api-error.js";
import { db } from "../../db/index.js";
import { budgets } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";

export const updateBudget = asyncHandler(
  async function updateBudget(request, response) {
    const { id } = request.params;
    const { error, data } = updateBudgetSchema.safeParse(request.body);

    if (error) {
      throw new ApiError({
        message: error.errors[0]?.message,
        statusCode: 400,
      });
    }

    const { category, maximumSpend, theme } = data;

    if (!category && !maximumSpend && !theme) {
      throw new ApiError({
        message: "no data provided to update",
        statusCode: 400,
      });
    }

    try {
      const [budget] = await db
        .update(budgets)
        .set({
          theme: theme ?? budgets.theme,
          category: category ?? budgets.category,
          maximumSpend: maximumSpend ?? budgets.maximumSpend,
        })
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

      response.status(200).json({
        data: budget,
        message: "budget updated successfully",
        status: "ok",
      });
    } catch (error) {
      if (error?.code == "23505") {
        throw new ApiError({
          message: "budget category or theme already in use",
          statusCode: 400,
        });
      }

      throw error;
    }
  }
);

import { updateBudgetSchema } from "@repo/shared-validators/budgets";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiError } from "../../utils/api-error.js";
import { db } from "../../db/index.js";
import { budgets } from "../../db/schema.js";
import { and, eq, or } from "drizzle-orm";

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

    if (category || theme) {
      const budgetWithCategoryOrTheme = await db.query.budgets.findFirst({
        columns: {
          id: true,
        },
        where: and(
          eq(budgets.userId, request.user.id),
          or(eq(budgets.category, category), eq(budgets.theme, theme))
        ),
      });

      if (budgetWithCategoryOrTheme) {
        throw new ApiError({
          message: "category or theme already in use",
          status: 409,
        });
      }
    }

    const [budget] = await db
      .update(budgets)
      .set({
        theme: theme ?? budgets.theme,
        category: category ?? budgets.category,
        maximumSpend: maximumSpend ?? budgets.maximumSpend,
      })
      .where(eq(budgets.id, id))
      .returning({
        id: budgets.id,
        category: budgets.category,
        maximumSpend: budgets.maximumSpend,
        theme: budgets.theme,
      });

    response.status(200).json({
      data: {
        id: budget.id,
        ...(category ? { category: budget.category } : {}),
        ...(maximumSpend ? { maximumSpend: budget.maximumSpend } : {}),
        ...(theme ? { theme: budget.theme } : {}),
      },
      message: "budget updated successfully",
      status: "ok",
    });
  }
);

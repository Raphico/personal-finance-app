import { budgetSchema } from "@repo/shared-validators/budgets";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiError } from "../../utils/api-error.js";
import { db } from "../../db/index.js";
import { and, eq, or } from "drizzle-orm";
import { budgets } from "../../db/schema.js";
import { ApiResponse } from "../../utils/api-response.js";

export const addNewBudget = asyncHandler(
  async function addNewBudget(request, response) {
    const { error, data } = budgetSchema.safeParse(request.body);

    if (error) {
      throw new ApiError({
        message: error.errors[0]?.message,
        statusCode: 400,
      });
    }

    const { category, maximumSpend, theme } = data;

    const categoryOrThemeInUse = await db.query.budgets.findFirst({
      columns: {
        id: true,
      },
      where: and(
        eq(budgets.userId, request.user.id),
        or(eq(budgets.category, category), eq(budgets.theme, theme))
      ),
    });

    if (categoryOrThemeInUse) {
      throw new ApiError({
        message: "category or theme already in use",
        status: 409,
      });
    }

    const [budget] = await db
      .insert(budgets)
      .values({
        category,
        maximumSpend,
        theme,
        userId: request.user.id,
      })
      .returning({
        id: budgets.id,
        category: budgets.category,
        maximumSpend: budgets.maximumSpend,
        theme: budgets.theme,
      });

    response.status(201).json(
      new ApiResponse({
        data: budget,
        message: "budget created successfully",
        status: "ok",
      })
    );
  }
);

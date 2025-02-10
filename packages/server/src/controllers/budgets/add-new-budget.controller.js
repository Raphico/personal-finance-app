import { budgetSchema } from "@repo/shared-validators/budgets";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiError } from "../../utils/api-error.js";
import { db } from "../../db/index.js";
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

    try {
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

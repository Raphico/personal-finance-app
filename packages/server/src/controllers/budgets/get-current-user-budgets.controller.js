import { desc, eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { budgets, transactions } from "../../db/schema.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";

export const getCurrentUserBudgets = asyncHandler(
  async function getCurrentUserBudgets(request, response) {
    const { limit } = request.query;

    const userBudgets = await db
      .select({
        id: budgets.id,
        category: budgets.category,
        maximumSpend: budgets.maximumSpend,
        theme: budgets.theme,
        transactions: sql`COALESCE(json_agg(
        json_build_object(
          'id', ${transactions.id},
          'name', ${transactions.name},
          'date', ${transactions.date},
          'amount', ${transactions.amount}
        )
      ) FILTER (WHERE ${transactions.id} IS NOT NULL), '[]')`,
      })
      .from(budgets)
      .leftJoin(
        transactions,
        sql`cast(${budgets.category} as text) = cast(${transactions.category} as text)`
      )
      .where(eq(budgets.userId, request.user.id))
      .groupBy(budgets.id)
      .orderBy(desc(budgets.updatedAt))
      .limit(Number(limit));

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

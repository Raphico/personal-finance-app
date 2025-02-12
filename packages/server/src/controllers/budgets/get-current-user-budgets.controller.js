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
        transactions: {
          id: transactions.id,
          name: transactions.name,
          date: transactions.date,
          amount: transactions.amount,
        },
      })
      .from(budgets)
      .leftJoin(
        transactions,
        sql`cast(${budgets.category} as text) = cast(${transactions.category} as text)`
      )
      .limit(Number(limit))
      .where(eq(budgets.userId, request.user.id))
      .orderBy(desc(budgets.updatedAt));

    const groupedBudgets = new Map();

    for (const budgetEntry of userBudgets) {
      if (!groupedBudgets.has(budgetEntry.id)) {
        groupedBudgets.set(budgetEntry.id, {
          ...budgetEntry,
          transactions: budgetEntry.transactions
            ? [budgetEntry.transactions]
            : [],
        });
        continue;
      }

      groupedBudgets
        .get(budgetEntry.id)
        .transactions.push(budgetEntry.transactions);
    }

    return response.status(200).json(
      new ApiResponse({
        data: {
          budgets: Array.from(groupedBudgets.values()),
        },
        message: "budgets retrieved successfully",
        status: "ok",
      })
    );
  }
);

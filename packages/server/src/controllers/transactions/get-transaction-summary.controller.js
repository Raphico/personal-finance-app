import { and, eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { transactions } from "../../db/schema.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";

export const getTransactionSummary = asyncHandler(
  async function getTransactionSummary(request, response) {
    const [summary] = await db
      .select({
        income: sql`SUM(CASE WHEN ${transactions.category} = 'income' THEN ${transactions.amount} END)`,
        expenses: sql`SUM(CASE WHEN ${transactions.category} <> 'income' THEN ${transactions.amount} END)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, request.user.id),
          eq(transactions.status, "active")
        )
      );

    response.status(200).json(
      new ApiResponse({
        data: summary,
        message: "Transaction's summary retrieved successfully",
        status: "ok",
      })
    );
  }
);

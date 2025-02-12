import { and, desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { transactions } from "../../db/schema.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";

export const getCurrentUserTransactions = asyncHandler(
  async function getCurrentUserTransactions(request, response) {
    const { limit } = request.query;

    const userTransactions = await db
      .select()
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, request.user.id),
          eq(transactions.status, "active")
        )
      )
      .limit(Number(limit))
      .orderBy(desc(transactions.createdAt));

    return response.status(200).json(
      new ApiResponse({
        data: {
          transactions: userTransactions,
        },
        message: "transactions retrieved successfully",
        status: "ok",
      })
    );
  }
);

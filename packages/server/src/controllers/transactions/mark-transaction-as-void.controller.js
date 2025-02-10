import { asyncHandler } from "../../utils/async-handler.js";
import { db } from "../../db/index.js";
import { transactions } from "../../db/schema.js";
import { and, eq } from "drizzle-orm";
import { ApiResponse } from "../../utils/api-response.js";

export const markTransactionAsVoid = asyncHandler(
  async function markTransactionAsVoid(request, response) {
    const { id } = request.params;

    const [transaction] = await db
      .update(transactions)
      .set({
        status: "voided",
      })
      .where(
        and(eq(transactions.id, id), eq(request.user.id, transactions.userId))
      )
      .returning({ id: transactions.id, status: transactions.status });

    response.status(200).json(
      new ApiResponse({
        data: transaction,
        message: "transaction voided succesfully",
        status: "ok",
      })
    );
  }
);

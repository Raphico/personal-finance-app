import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { pots, transactions } from "../../db/schema.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import { getCurrentDate } from "../../utils/helpers.js";

export const deletePot = asyncHandler(
  async function deletePot(request, response) {
    const { id } = request.params;

    const pot = await db.transaction(async (tx) => {
      const [pot] = await tx
        .delete(pots)
        .where(and(eq(pots.userId, request.user.id), eq(pots.id, id)))
        .returning({
          id: pots.id,
          name: pots.name,
          target: pots.target,
          totalSaved: pots.totalSaved,
          theme: pots.theme,
        });

      if (!pot) {
        throw new ApiError({
          message: "pot not found",
          status: 404,
        });
      }

      if (pot.totalSaved > 0) {
        const [transaction] = await tx
          .insert(transactions)
          .values({
            userId: request.user.id,
            name: `${pot.name} refund`,
            amount: pot.totalSaved,
            category: "pot",
            date: getCurrentDate(),
          })
          .returning({ id: transactions.id });

        if (!transaction) {
          throw new ApiError({
            message: "Failed to refund pot balance",
            statusCode: 500,
          });
        }
      }

      return pot;
    });

    response.status(200).json(
      new ApiResponse({
        data: pot,
        message: "pot deleted successfully",
        status: "ok",
      })
    );
  }
);

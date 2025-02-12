import { eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { pots } from "../../db/schema.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";

export const getTotalSaved = asyncHandler(
  async function getTotalSaved(request, response) {
    const [totalSaved] = await db
      .select({
        totalSaved: sql`SUM(${pots.totalSaved})`.as("total_saved"),
      })
      .from(pots)
      .where(eq(pots.userId, request.user.id));

    response.status(200).json(
      new ApiResponse({
        data: totalSaved,
        message: "Pot's total saved retrieved successfully",
        status: "ok",
      })
    );
  }
);

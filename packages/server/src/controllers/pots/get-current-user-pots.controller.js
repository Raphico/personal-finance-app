import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { pots } from "../../db/schema.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";

export const getCurrentUserPots = asyncHandler(
  async function getCurrentUserPots(request, response) {
    const userPots = await db
      .select()
      .from(pots)
      .where(eq(pots.userId, request.user.id));

    response.status(200).json(
      new ApiResponse({
        data: {
          pots: userPots,
        },
        message: "pots retrieved successfully",
        status: "ok",
      })
    );
  }
);

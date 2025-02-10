import { potSchema } from "@repo/shared-validators/pots";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiError } from "../../utils/api-error.js";
import { db } from "../../db/index.js";
import { and, eq, or } from "drizzle-orm";
import { pots } from "../../db/schema.js";
import { ApiResponse } from "../../utils/api-response.js";

export const addNewPot = asyncHandler(
  async function addNewPot(request, response) {
    const { error, data } = potSchema.safeParse(request.body);

    if (error) {
      throw new ApiError({
        message: error.errors[0]?.message,
        statusCode: 400,
      });
    }

    const { name, target, theme } = data;

    const nameOrThemeInUse = await db.query.pots.findFirst({
      columns: {
        id: true,
      },
      where: and(
        eq(pots.userId, request.user.id),
        or(eq(pots.name, name), eq(pots.theme, theme))
      ),
    });

    if (nameOrThemeInUse) {
      throw new ApiError({
        message: "pot name or theme already in use",
        statusCode: 409,
      });
    }

    const [pot] = await db
      .insert(pots)
      .values({
        userId: request.user.id,
        name,
        target,
        theme,
      })
      .returning({
        id: pots.id,
        name: pots.name,
        target: pots.target,
        theme: pots.theme,
      });

    response.status(201).json(
      new ApiResponse({
        data: pot,
        message: "pot created successfully",
        status: "ok",
      })
    );
  }
);

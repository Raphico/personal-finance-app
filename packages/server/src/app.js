import express from "express";
import helmet from "helmet";
import cors from "cors";
import { env } from "./env.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { morganMiddleware } from "./logging.js";

export const app = express();

app.use(helmet());
app.use(morganMiddleware);
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: env.CORS_METHODS,
    allowedHeaders: env.CORS_ALLOWED_HEADERS,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware);

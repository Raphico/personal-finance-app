import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { morganMiddleware } from "./logging.js";
import authRoute from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

export const app = express();

app.use(helmet());
app.use(morganMiddleware);
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: env.CORS_METHODS,
    allowedHeaders: env.CORS_ALLOWED_HEADERS,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRouter);

app.use(errorMiddleware);

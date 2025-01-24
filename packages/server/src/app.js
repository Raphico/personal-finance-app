import path from "node:path";
import fs from "node:fs";
import { parse } from "yaml";
import { fileURLToPath } from "url";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { env } from "./config.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { morganMiddleware } from "./logging.js";
import { flexibleLimiter } from "./middleware/rate-limit.middleware.js";
import requestIp from "request-ip";
import authRoute from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import healthRoute from "./routes/health.route.js";

const __filePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filePath);

const swaggerFile = fs.readFileSync(
  path.resolve(__dirname, "swagger.yml"),
  "utf8"
);
const swaggerDocument = parse(swaggerFile);

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

app.use(requestIp.mw());

app.use(flexibleLimiter);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/health", healthRoute);

app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: "Personal finance app API docs",
  })
);

app.use(errorMiddleware);

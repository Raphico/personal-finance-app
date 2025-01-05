import express from "express";
import helmet from "helmet";
import cors from "cors";
import { env } from "./env.js";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: env.CORS_METHODS,
    allowedHeaders: env.CORS_ALLOWED_HEADERS,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

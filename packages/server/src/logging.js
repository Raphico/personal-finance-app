import morgan from "morgan";
import winston from "winston";
import { env } from "./env.js";

const colors = {
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "magenta",
  verbose: "cyan",
  debug: "green",
  silly: "gray",
};

winston.addColors(colors);

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      level: env.NODE_ENV === "production" ? "http" : "silly",
      format: winston.format.colorize({ all: true }),
    }),
    new winston.transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
    new winston.transports.File({
      level: "http",
      filename: "logs/combined.log",
    }),
  ],
});

export const morganMiddleware = morgan(
  env.NODE_ENV == "production"
    ? ":remote-addr - :remote-user [:date[clf]] ':method :url HTTP/:http-version' :status :res[content-length] ':referrer' ':user-agent'"
    : ":method :url :status :response-time ms - :res[content-length]",
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
);

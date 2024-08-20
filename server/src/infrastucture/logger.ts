import path from "path";
import fs from "fs";
import { isProd } from "../config";
import { NextFunction, Request, Response } from "express";
import { createLogger, format, transports } from "winston";

const incomingIcon = "▼";
export const outgoingIcon = "▲";

export const LOG_DIR = ".logs";

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

export const logger = createLogger({
  level: isProd ? "info" : "debug",
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
    }),
    new transports.File({
      filename: path.join(LOG_DIR, "combined.log"),
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
    }),
  ],
});

// Logging middleware for API requests
export const logRequests = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.debug(
    `${incomingIcon} Incoming Request: ${req.method} ${req.url} - Body: ${
      JSON.stringify(req.body)
    }`,
  );
  next();
};

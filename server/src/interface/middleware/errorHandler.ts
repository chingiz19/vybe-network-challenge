import { NextFunction, Request, Response } from "express";
import { logger } from "../../infrastucture";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error("Internal Server Error", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
}

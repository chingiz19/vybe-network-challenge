import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../types";
import { logger, outgoingIcon } from "../../infrastucture";

export const handleRequest =
  (handler: (req: Request) => Promise<ApiResponse<any>>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await handler(req);
      logger.info(
        `${outgoingIcon} Request: ${req.method} ${req.url} completed successfully!`,
      );
      res.json(response.toJson());
    } catch (error) {
      next(error);
    }
  };

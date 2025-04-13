import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/responseUtils";

// Error handler middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[ERROR] ${err.message}`, err);
  sendError(res, err.message || "Internal Server Error", err.statusCode || 500);
};

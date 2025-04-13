import { Response } from "express";

// Send data response
export const sendData = (res: Response, data: any, statusCode = 200): void => {
  res.status(statusCode).json({
    success: true,
    data,
  });
};

// Send error response
export const sendError = (
  res: Response,
  message: string,
  statusCode = 500
): void => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { sendError } from '../utils/response';

export interface CustomError extends Error {
  statusCode?: number;
  message: string;
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error({
    statusCode,
    message,
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  sendError(res, statusCode, message, {
    path: req.path,
    timestamp: new Date().toISOString(),
  });
};

export default errorMiddleware;

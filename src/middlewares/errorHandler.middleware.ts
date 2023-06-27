import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CreateResponse, CreateResponseInstance } from '@libs/createResponse.lib';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler: ErrorRequestHandler = async (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  const stack = process.env.NODE_ENV === 'production' ? undefined : err.stack;

  const response: CreateResponseInstance = new CreateResponse(res);

  return response
    .status(status)
    .json({
      message,
      stack,
    })
    .send();
};

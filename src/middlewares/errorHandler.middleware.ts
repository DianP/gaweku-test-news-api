import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import type { ApiResponse } from '@typings/api/apiResponse.type';
import type { AppError } from '@typings/appError.type';

const errorHandler: ErrorRequestHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  const stack = process.env.NODE_ENV === 'production' ? undefined : err.stack;

  const response: ApiResponse = {
    status: 'error',
    code: status,
    error: {
      message,
      stack,
    },
  };

  res.status(status).json(response);
};

export default errorHandler;

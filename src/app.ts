import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { appConfig } from '@configs/app.config';
import { apiRouterV1 } from '@routers/v1/api.router';
import { errorHandler, AppError } from '@middlewares/errorHandler.middleware';

const app: Express = express();

// set cors & security
app.use(
  cors({
    origin: appConfig.cors.origin,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set headers for all requests to return JSON
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Register routes for API v1
app.use('/api/v1', apiRouterV1);

// Catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const err: AppError = new Error('Not found');
  err.status = 404;
  next(err);
});

// Use the error handler middleware
app.use(errorHandler);

export default app;

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import config from '@configs/config';
import routeV1 from '@routes/api/v1.route';
import errorHandler from '@middlewares/errorHandler.middleware';

// type imports
import type { AppError } from '@typings/appError.type';

const app: Express = express();

// set cors
app.use(
  cors({
    origin: config.cors.origin,
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
app.use('/api/v1', routeV1);

// Catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const err: AppError = new Error('Not found');
  err.status = 404;
  next(err);
});

// Use the error handler middleware
app.use(errorHandler);

export default app;

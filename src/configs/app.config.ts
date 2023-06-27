import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export const appConfig = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
};

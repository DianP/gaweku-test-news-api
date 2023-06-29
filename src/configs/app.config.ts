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

export const nyTimesConfig = {
  apiUrl: process.env.NYTIMES_API_URL,
  apiKey: process.env.NYTIMES_API_KEY,
};

export const newsAPIConfig = {
  apiUrl: process.env.NEWSAPI_API_URL,
  apiKey: process.env.NEWSAPI_API_KEY,
};

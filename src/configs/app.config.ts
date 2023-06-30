import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export const appConfig = {
  node_env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '1337',
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
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

export const redisConfig = {
  active: process.env.CACHE_ENABLED || true,
  expiration: process.env.CACHE_EXPIRATION || 3600,
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || '',
};

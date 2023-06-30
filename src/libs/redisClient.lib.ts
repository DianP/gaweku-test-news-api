import { createClient, RedisClientType } from 'redis';
import { redisConfig } from '@configs/app.config';
import logger from '@middlewares/logger.middleware';

let redisClient: RedisClientType;

if (redisConfig.active === 'true') {
  if (!redisConfig.host) {
    throw new Error('Redis host is not defined');
  }

  if (!redisConfig.port) {
    throw new Error('Redis port is not defined');
  }

  let redisUrl = `redis://${redisConfig.host}:${redisConfig.port}`;

  if (redisConfig.password) {
    redisUrl = `redis://:${redisConfig.password}@${redisConfig.host}:${redisConfig.port}`;
  }

  redisClient = createClient({
    url: redisUrl,
  });

  redisClient.connect().catch((err) => {
    logger.error('Redis connection error:', err);
  });

  redisClient.on('error', (err) => {
    logger.error('Redis error:', err);
  });
}

const useRedis = (key: string, data: string) => {
  if (redisClient) {
    redisClient.set(key, data, {
      EX: parseInt(redisConfig.expiration as string, 10),
    });
  }
};

export { redisClient, useRedis };

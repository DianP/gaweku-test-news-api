import type { Request, Response, NextFunction } from 'express';
import { redisClient } from '@libs/redisClient.lib';
import { redisConfig } from '@configs/app.config';
import { CreateResponse, CreateResponseInstance } from '@libs/createResponse.lib';

export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const response: CreateResponseInstance = new CreateResponse(res);
  const { url } = req;

  if (redisConfig.active === 'true') {
    try {
      const cachedData = await redisClient.get(url).catch((err) => {
        throw new Error(err);
      });

      if (cachedData) {
        const data = JSON.parse(cachedData).data;
        const meta = JSON.parse(cachedData).meta;

        return response.status(200).json(data).meta(meta).send();
      }

      return next();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal server error';

      return response
        .status(500)
        .json({ message: `Redis ${errorMessage}` })
        .send();
    }
  }

  return next();
};

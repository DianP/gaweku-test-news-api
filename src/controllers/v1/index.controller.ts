import type { Request, Response } from 'express';
import { CreateResponse, CreateResponseInstance } from '@libs/createResponse.lib';

export class IndexController {
  static async index(_req: Request, res: Response): Promise<Response> {
    const response: CreateResponseInstance = new CreateResponse(res);

    return response
      .status(200)
      .json({
        message: 'Welcome to the News API',
        version: '1.0.0',
      })
      .send();
  }
}

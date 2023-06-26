import type { Request, Response } from 'express';
import type { ApiResponse } from '@typings/api/apiResponse.type';

export class IndexController {
  static getIndex(_req: Request, res: Response): Response<ApiResponse> {
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        message: 'Hello world!!',
      },
    });
  }
}

export default IndexController;

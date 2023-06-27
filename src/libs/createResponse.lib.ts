import type { Response } from 'express';
export interface CreateResponseInstance {
  status(code: number): CreateResponseInstance;
  json(data: object | object[]): CreateResponseInstance;
  meta(meta: object | object[]): CreateResponseInstance;
  send(): Response;
}

export interface ApiResponse {
  status: 'success' | 'error';
  code: number;
  data?: object | object[];
  error?: object | object[];
  meta?: object | object[];
}

export class CreateResponse {
  private res: Response;
  private response: ApiResponse;

  constructor(res: Response) {
    this.res = res;
    this.response = {
      status: 'error',
      code: 500,
    };
  }

  status(code: number) {
    this.response.code = code;
    if (code < 400) {
      this.response.status = 'success';
    } else {
      this.response.status = 'error';
    }

    return this;
  }

  json(data: object | object[]) {
    if (this.response.status === 'success') {
      this.response.data = data;
    } else {
      this.response.error = data;
    }

    return this;
  }

  meta(meta: object | object[]) {
    this.response.meta = meta;

    return this;
  }

  send() {
    return this.res.status(this.response.code).json(this.response);
  }
}

import type { Request, Response } from 'express';
import { CreateResponse, CreateResponseInstance } from '@libs/createResponse.lib';
import { z } from 'zod';
import type { News, NewsPaginationMeta, NewsParams } from '@models/news.model';
import { newsParamsSchema } from '@schema/newsParams.schema';
import { NYTimesService } from '@services/nytimes.service';
import { NewsAPIService } from '@services/newsapi.service';

interface ServiceResponse {
  data: News[];
  meta: {
    pagination: NewsPaginationMeta;
  };
}

export class NewsController {
  static async getNews(req: Request, res: Response): Promise<Response> {
    const response: CreateResponseInstance = new CreateResponse(res);

    try {
      const { provider, filter, search, page } = newsParamsSchema.parse({
        ...req.query,
        page: parseInt(req.query.page as string, 10) || 1,
      });

      const params: NewsParams = {
        provider,
        filter,
        search,
        page,
      };

      // NYTimes Provider
      if (provider === 'nytimes') {
        const data = await NewsController.getNYTimesService(params);

        return response.status(200).json(data.data).meta(data.meta.pagination).send();
      }

      // NewsAPI Provider
      if (provider === 'newsapi') {
        const data = await NewsController.getNewsAPIService(params);

        return response.status(200).json(data.data).meta(data.meta).send();
      }

      // All Provider
      const data = await NewsController.getAllService(params);

      return response.status(200).json(data.data).meta(data.meta).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => {
          return err;
        });

        return response
          .status(400)
          .json({
            message: 'Bad request',
            errors,
          })
          .send();
      }

      const errorMessage = error instanceof Error ? error.message : 'Internal server error';

      return response.status(500).json({ message: errorMessage }).send();
    }
  }

  //Chunk getNews
  private static async getNYTimesService(params: NewsParams): Promise<ServiceResponse> {
    const nyTimesService = new NYTimesService();

    // NYTimes Popular News
    if (params.filter == 'popular') {
      const data = await nyTimesService.getNewsPopular(params);

      // create pagination
      const paginatedData = data.data.slice((params.page - 1) * 10, params.page * 10);
      const pagination: NewsPaginationMeta = {
        totalResults: data.totalAPIData > 2000 ? 2000 : data.totalAPIData,
        page: params.page,
        pageCount: Math.ceil(data.totalAPIData / 10) > 200 ? 200 : Math.ceil(data.totalAPIData / 10),
      };

      const result = {
        data: paginatedData,
        meta: {
          pagination,
        },
      };

      return result;
    }

    // NYTimes All News
    const data = await nyTimesService.getNewsAll(params);
    const pagination: NewsPaginationMeta = {
      totalResults: data.totalAPIData > 2000 ? 2000 : data.totalAPIData,
      page: params.page,
      pageCount: Math.ceil(data.totalAPIData / 10) > 200 ? 200 : Math.ceil(data.totalAPIData / 10),
    };

    const result = {
      data: data.data,
      meta: {
        pagination,
      },
    };

    return result;
  }

  private static async getNewsAPIService(params: NewsParams): Promise<ServiceResponse> {
    const newsAPIService = new NewsAPIService();

    // NewsAPI Popular News
    if (params.filter == 'popular') {
      const data = await newsAPIService.getNewsPopular(params);

      // create pagination
      const paginatedData = data.data.slice((params.page - 1) * 10, params.page * 10);
      const pagination: NewsPaginationMeta = {
        totalResults: data.totalAPIData > 100 ? 100 : data.totalAPIData,
        page: params.page,
        pageCount: Math.ceil(data.totalAPIData / 10) > 10 ? 10 : Math.ceil(data.totalAPIData / 10),
      };

      const result = {
        data: paginatedData,
        meta: {
          pagination,
        },
      };

      return result;
    }

    const data = await newsAPIService.getNews(params);

    const pagination: NewsPaginationMeta = {
      totalResults: data.totalAPIData > 100 ? 100 : data.totalAPIData,
      page: params.page,
      pageCount: Math.ceil(data.totalAPIData / 10) > 10 ? 10 : Math.ceil(data.totalAPIData / 10),
    };

    const result = {
      data: data.data,
      meta: {
        pagination,
      },
    };

    return result;
  }

  private static async getAllService(params: NewsParams): Promise<ServiceResponse> {
    const nyTimesService = new NYTimesService();
    const newsAPIService = new NewsAPIService();

    if (params.filter == 'popular') {
      const rawData: News[][] = [];
      const totalAPIData: number[] = [];

      await Promise.all([
        nyTimesService
          .getNewsPopular(params)
          .then((data) => {
            rawData.push(data.data);
            totalAPIData.push(data.totalAPIData);
          })
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          .catch(() => {}),
        newsAPIService
          .getNewsPopular(params)
          .then((data) => {
            rawData.push(data.data);
            totalAPIData.push(data.totalAPIData);
          })
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          .catch(() => {}),
      ]);

      if (rawData.length == 0) {
        throw new Error('Internal server error');
      }

      const mergedData = rawData.flat();
      const mergedTotalAPIData = totalAPIData.reduce((a, b) => a + b, 0);

      const sortedData = mergedData.sort((a, b) => {
        const dateA = new Date(a.publishedAt as string);
        const dateB = new Date(b.publishedAt as string);

        return dateB.getTime() - dateA.getTime();
      });

      // create pagination
      const paginatedData = sortedData.slice((params.page - 1) * 20, params.page * 20);
      const pagination: NewsPaginationMeta = {
        totalResults: mergedTotalAPIData > 2000 ? 2000 : mergedTotalAPIData,
        page: params.page,
        pageCount: Math.ceil(mergedTotalAPIData / 20) > 200 ? 200 : Math.ceil(mergedTotalAPIData / 20),
      };

      const result = {
        data: paginatedData,
        meta: {
          pagination,
        },
      };

      return result;
    }

    // All Provider All News
    const rawData: News[][] = [];
    const totalAPIData: number[] = [];

    await Promise.all([
      nyTimesService
        .getNewsAll(params)
        .then((data) => {
          rawData.push(data.data);
          totalAPIData.push(data.totalAPIData);
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => {}),

      newsAPIService
        .getNews(params)
        .then((data) => {
          rawData.push(data.data);
          totalAPIData.push(data.totalAPIData);
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => {}),
    ]);

    if (rawData.length == 0) {
      throw new Error('Internal server error');
    }

    const mergedData = rawData.flat();
    const mergedTotalAPIData = totalAPIData.reduce((a, b) => a + b, 0);

    const sortedData = mergedData.sort((a, b) => {
      const dateA = new Date(a.publishedAt as string);
      const dateB = new Date(b.publishedAt as string);

      return dateB.getTime() - dateA.getTime();
    });

    // create pagination
    const pagination: NewsPaginationMeta = {
      totalResults: mergedTotalAPIData > 200 ? 200 : mergedTotalAPIData,
      page: params.page,
      pageCount: Math.ceil(mergedTotalAPIData / 20) > 10 ? 10 : Math.ceil(mergedTotalAPIData / 20),
    };

    const result = {
      data: sortedData,
      meta: {
        pagination,
      },
    };

    return result;
  }
}

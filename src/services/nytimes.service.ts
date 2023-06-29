import axios from 'axios';
import { nyTimesConfig } from '@configs/app.config';
import { News, NewsParams } from '@models/news.model';
import type { NYTimesResponse, NYTimesResponsePopular } from '@typings/services/nytimesResponse.type';

interface GetNewsResponse {
  totalAPIData: number;
  data: News[];
}

export class NYTimesService {
  async getNewsAll(params: NewsParams): Promise<GetNewsResponse> {
    const url = this.createUrl(params);
    const data = await axios
      .get<NYTimesResponse>(url as string)
      .then((res) => {
        const data = res.data;
        const response = data.response.docs.map((item) => new News({ provider: 'nytimes', filter: 'all', ...item }));

        const result = {
          totalAPIData: data.response.meta.hits,
          data: response,
        };

        return result;
      })
      .catch(() => {
        throw new Error('NYTimes API error. Please try again later.');
      });

    return data;
  }

  async getNewsPopular(params: NewsParams): Promise<GetNewsResponse> {
    const url = this.createUrl(params);
    if (!Array.isArray(url)) {
      throw new Error('NYTimes API error. Please try again later.');
    }

    const rawData: News[][] = [];
    const errors = [];

    await Promise.all(
      url.map((url) =>
        axios
          .get<NYTimesResponsePopular>(url)
          .then((res) => {
            const data = res.data;
            const response = data.results.map((item) => new News({ provider: 'nytimes', filter: 'popular', ...item }));

            rawData.push(response);
          })
          .catch((error) => {
            errors.push(error);
          })
      )
    );

    if (rawData.length === 0) {
      throw new Error('All NYTimes API endpoints are down. Please try again later.');
    }

    // Combine the successful data from all endpoints
    const mergedData: News[] = rawData.flat();

    const sortedData = mergedData.sort((a, b) => {
      const dateA = new Date(a.publishedAt as string);
      const dateB = new Date(b.publishedAt as string);

      return dateB.getTime() - dateA.getTime();
    });

    const result = {
      totalAPIData: sortedData.length,
      data: sortedData,
    };

    return result;
  }

  private createUrl(params: NewsParams): string | string[] {
    const { apiUrl, apiKey } = nyTimesConfig;
    const { search, page, filter } = params;
    const defaultParams = 'fl=headline,abstract,source,byline,web_url,multimedia,pub_date';

    if (filter === 'popular') {
      const url = [
        `${apiUrl}/mostpopular/v2/viewed/1.json?api-key=${apiKey}`,
        `${apiUrl}/mostpopular/v2/emailed/1.json?api-key=${apiKey}`,
        `${apiUrl}/mostpopular/v2/shared/1/facebook.json?api-key=${apiKey}`,
      ];

      return url as string[];
    }

    let url = `${apiUrl}/search/v2/articlesearch.json?$&api-key=${apiKey}&${defaultParams}`;

    if (search) {
      url += `&q=${search}`;
    }

    if (page) {
      url += `&page=${page - 1}`;
    }

    return url;
  }
}

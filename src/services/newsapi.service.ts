import axios from 'axios';
import { newsAPIConfig } from '@configs/app.config';
import { News, NewsParams } from '@models/news.model';
import type { NewsAPIResponse } from '@typings/services/newsapiResponse.type';

interface GetNewsResponse {
  totalAPIData: number;
  data: News[];
}

export class NewsAPIService {
  async getNews(params: NewsParams): Promise<GetNewsResponse> {
    const url = this.createUrl(params);
    const data = await axios
      .get<NewsAPIResponse>(url as string)
      .then((res) => {
        const response = res.data;
        const data = response.articles.map((item) => new News({ provider: 'newsapi', filter: 'all', ...item }));

        const result = {
          totalAPIData: response.totalResults,
          data: data,
        };

        return result;
      })
      .catch(() => {
        throw new Error('NewsAPI error. Please try again later.');
      });

    return data;
  }

  async getNewsPopular(params: NewsParams): Promise<GetNewsResponse> {
    const url = this.createUrl(params);
    const data = await axios
      .get<NewsAPIResponse>(url as string)
      .then((res) => {
        const response = res.data;
        const data = response.articles.map((item) => new News({ provider: 'newsapi', filter: 'all', ...item }));

        const result = {
          totalAPIData: response.totalResults,
          data: data,
        };

        return result;
      })
      .catch(() => {
        throw new Error('NewsAPI error. Please try again later.');
      });

    return data;
  }

  private createUrl(params: NewsParams): string {
    const { apiUrl, apiKey } = newsAPIConfig;
    const { search, page, filter } = params;
    const pageSize = 10;
    const country = 'us';
    const excludeDomains = 'nytimes.com';

    if (filter === 'popular') {
      const url = `${apiUrl}/top-headlines?apiKey=${apiKey}&pageSize=100&country=${country}&excludeDomains=${excludeDomains}`;

      return url;
    }

    let url = `${apiUrl}/everything?apiKey=${apiKey}&pageSize=${pageSize}&excludeDomains=${excludeDomains}`;

    if (!search) {
      url += '&q=*';
    } else {
      url += `&q=${search}`;
    }

    if (page) {
      url += `&page=${page}`;
    }

    return url;
  }
}

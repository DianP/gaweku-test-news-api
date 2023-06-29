export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIResponseItem[];
}

export interface NewsAPIResponseItem {
  title: string;
  description: string;
  content: string;
  source: NewsAPIResponseItemSource;
  author: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

export interface NewsAPIResponseItemSource {
  id?: string;
  name: string;
}

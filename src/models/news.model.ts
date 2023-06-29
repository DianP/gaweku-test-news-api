import type {
  NYTimesResponseItem,
  NYTimesResponseItemPopular,
  NYTimesResponseItemMultimedia,
  NYTimesResponseItemPopularMedia,
  NYTimesResponseItemPopularMediaMetadata,
} from '@typings/services/nytimesResponse.type';

import type { NewsAPIResponseItem } from '@typings/services/newsapiResponse.type';

type SourceNYTimesAll = { provider: 'nytimes'; filter: 'all' } & NYTimesResponseItem;
type SourceNYTimesPopular = { provider: 'nytimes'; filter: 'popular' } & NYTimesResponseItemPopular;
type SourceNewsAPI = { provider: 'newsapi'; filter: 'all' | 'popular' } & NewsAPIResponseItem;

type NewsAPIData = SourceNYTimesAll | SourceNYTimesPopular | SourceNewsAPI;

export interface NewsPaginationMeta {
  totalResults: number;
  page: number;
  pageCount: number;
}

export interface NewsParams {
  provider: 'nytimes' | 'newsapi' | 'all';
  filter: 'popular' | 'all';
  search?: string | undefined;
  page: number;
}

export class News {
  public title: string | null;
  public description: string | null;
  public snippet: string | null;
  public source: string | null;
  public author: string | null;
  public url: string | null;
  public thumbnail: string | null;
  public publishedAt: string | null;

  constructor(data: NewsAPIData) {
    this.title = null;
    this.description = null;
    this.snippet = null;
    this.source = null;
    this.author = null;
    this.url = null;
    this.thumbnail = null;
    this.publishedAt = null;

    if (data.provider === 'nytimes') {
      if (data.filter === 'popular') {
        this.title = data.title;
        this.description = data.abstract;
        this.snippet = data.abstract;
        this.source = data.source;
        this.author = this.getAuthor(data);
        this.url = data.url;
        this.thumbnail = this.getThumbnail(data);
        this.publishedAt = new Date(data.published_date).toISOString();

        return this;
      }

      this.title = data.headline.main;
      this.description = data.abstract;
      this.snippet = data.abstract;
      this.source = data.source;
      this.author = this.getAuthor(data);
      this.url = data.web_url;
      this.thumbnail = this.getThumbnail(data);
      this.publishedAt = new Date(data.pub_date).toISOString();

      return this;
    }

    if (data.provider === 'newsapi') {
      this.title = data.title;
      this.description = data.description;
      this.snippet = data.content;
      this.source = data.source.name;
      this.author = this.getAuthor(data);
      this.url = data.url;
      this.thumbnail = data.urlToImage;
      this.publishedAt = new Date(data.publishedAt).toISOString();

      return this;
    }
  }

  private getThumbnail(data: NewsAPIData): string | null {
    if (data.provider === 'nytimes') {
      if (data.filter === 'popular') {
        const mediaItem = data.media.find((item: NYTimesResponseItemPopularMedia) => item.subtype === 'photo');
        const selectedMedia = mediaItem || data.media[0];

        if (selectedMedia) {
          const thumbnail = selectedMedia['media-metadata'].find(
            (item: NYTimesResponseItemPopularMediaMetadata) => item.format === 'mediumThreeByTwo440'
          );

          return thumbnail ? thumbnail.url : null;
        }

        return null;
      }

      const thumbnail = data.multimedia.find(
        (item: NYTimesResponseItemMultimedia) => item.subType === 'mediumThreeByTwo440'
      );

      return thumbnail ? `https://static01.nytimes.com/${thumbnail.url}` : null;
    }

    if (data.provider === 'newsapi') {
      return data.urlToImage;
    }

    return null;
  }

  private getAuthor(data: NewsAPIData): string | null {
    if (data.provider === 'nytimes') {
      if (data.filter === 'popular') {
        if (!data.byline) {
          return `${data.source} Teams`;
        }

        return data.byline.replace('By ', '');
      }

      if (!data.byline.original) {
        return `${data.source} Teams`;
      }

      return data.byline.original.replace('By ', '');
    }

    if (data.provider === 'newsapi') {
      if (!data.author) {
        return `${data.source.name} Teams`;
      }

      return data.author;
    }

    return null;
  }
}

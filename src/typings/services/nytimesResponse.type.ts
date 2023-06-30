export interface NYTimesResponse {
  status: string;
  copyrigth: string;
  response: {
    docs: NYTimesResponseItem[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface NYTimesResponseItem {
  headline: {
    main: string;
  };
  abstract: string;
  lead_paragraph: string;
  source: string;
  byline: NYTimesResponseItemByline;
  web_url: string;
  multimedia: NYTimesResponseItemMultimedia[];
  pub_date: string;
}

export interface NYTimesResponseItemByline {
  original: string;
}

export interface NYTimesResponseItemMultimedia {
  url: string;
  subType: string;
}

/* Popular */

export interface NYTimesResponsePopular {
  status: string;
  copyrigth: string;
  num_results: number;
  results: NYTimesResponseItemPopular[];
}

export interface NYTimesResponseItemPopular {
  title: string;
  abstract: string;
  source: string;
  byline: string;
  url: string;
  media: NYTimesResponseItemPopularMedia[];
  published_date: string;
}

export interface NYTimesResponseItemPopularMedia {
  subtype: string;
  'media-metadata': NYTimesResponseItemPopularMediaMetadata[];
}

export interface NYTimesResponseItemPopularMediaMetadata {
  url: string;
  format: string;
}

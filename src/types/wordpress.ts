
export interface WordPressMedia {
  source_url: string;
}

export interface WordPressArticle {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  link: string;
  post_views_count?: number; // For Post Views Counter plugin
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      media_details?: {
        sizes?: {
          medium_large?: {
            source_url: string;
          };
          full?: {
            source_url: string;
          };
        };
      };
    }>;
    author?: Array<{
      name: string;
      link: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      link: string;
    }>>;
  };
}

export interface WordPressComment {
  id: number;
  author_name: string;
  author_avatar_urls?: {
    '24'?: string;
    '48'?: string;
    '96'?: string;
  };
  date: string;
  content: {
    rendered: string;
  };
  status: string;
}

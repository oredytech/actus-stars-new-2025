import axios from 'axios';

export interface WordPressMedia {
  source_url: string;
}

export interface WordPressArticle {
  id: number;
  date: string;
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

export const fetchLatestArticles = async (count: number = 5): Promise<WordPressArticle[]> => {
  try {
    const response = await axios.get(
      `https://actustars.net/wp-json/wp/v2/posts?_embed&per_page=${count}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching WordPress articles:', error);
    return [];
  }
};

export const fetchArticleById = async (id: number): Promise<WordPressArticle | null> => {
  try {
    const response = await axios.get(
      `https://actustars.net/wp-json/wp/v2/posts/${id}?_embed`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    return null;
  }
};

export const searchArticles = async (query: string): Promise<WordPressArticle[]> => {
  try {
    const response = await axios.get(
      `https://actustars.net/wp-json/wp/v2/posts?_embed&search=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error('Error searching WordPress articles:', error);
    return [];
  }
};

export const fetchComments = async (postId: number, perPage: number = 5): Promise<WordPressComment[]> => {
  try {
    const response = await axios.get(
      `https://actustars.net/wp-json/wp/v2/comments?post=${postId}&per_page=${perPage}&orderby=date&order=desc`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
};

export const submitComment = async (postId: number, name: string, email: string, content: string): Promise<boolean> => {
  try {
    const response = await axios.post('https://actustars.net/wp-json/wp/v2/comments', {
      post: postId,
      author_name: name,
      author_email: email,
      content,
    });
    return !!response.data.id;
  } catch (error) {
    console.error('Error submitting comment:', error);
    return false;
  }
};

export const fetchSimilarArticles = async (categoryIds: number[], excludeId: number, count: number = 4): Promise<WordPressArticle[]> => {
  if (categoryIds.length === 0) return [];
  
  try {
    const params = new URLSearchParams({
      _embed: '',
      per_page: count.toString(),
      exclude: excludeId.toString(),
      categories: categoryIds.join(',')
    });
    
    const response = await axios.get(
      `https://actustars.net/wp-json/wp/v2/posts?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching similar articles:', error);
    return [];
  }
};

export const getArticleImage = (article: WordPressArticle): string => {
  if (!article._embedded || !article._embedded['wp:featuredmedia']) {
    return 'https://picsum.photos/600/400?grayscale'; // Fallback image
  }
  
  const media = article._embedded['wp:featuredmedia'][0];
  
  // Try to get medium_large size first, then full size, then source_url
  if (media.media_details?.sizes?.medium_large) {
    return media.media_details.sizes.medium_large.source_url;
  } else if (media.media_details?.sizes?.full) {
    return media.media_details.sizes.full.source_url;
  } else {
    return media.source_url;
  }
};

export const stripHtmlTags = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const getArticleAuthor = (article: WordPressArticle): string => {
  if (!article._embedded || !article._embedded.author || !article._embedded.author[0]) {
    return 'Anonyme';
  }
  return article._embedded.author[0].name;
};

export const getArticleCategories = (article: WordPressArticle): string[] => {
  if (!article._embedded || !article._embedded['wp:term'] || !article._embedded['wp:term'][0]) {
    return [];
  }
  return article._embedded['wp:term'][0].map(term => term.name);
};

export const getCategoryIds = (article: WordPressArticle): number[] => {
  if (!article._embedded || !article._embedded['wp:term'] || !article._embedded['wp:term'][0]) {
    return [];
  }
  return article._embedded['wp:term'][0].map(term => term.id);
};

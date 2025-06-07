
import { WordPressArticle } from '../types/wordpress';

export const getArticleViews = (article: WordPressArticle): number => {
  return article.post_views_count || 0;
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

// Convertir l'URL vers actustars.net
export const convertToActuStarsUrl = (originalUrl: string, slug: string): string => {
  return `https://actustars.net/${slug}`;
};

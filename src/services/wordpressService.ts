
// Re-export types
export type { WordPressMedia, WordPressArticle, WordPressComment } from '../types/wordpress';

// Re-export article services
export {
  fetchLatestArticles,
  fetchArticleBySlug,
  fetchArticleById,
  searchArticles,
  fetchSimilarArticles
} from './wordpressArticleService';

// Re-export comment services
export {
  fetchComments,
  submitComment
} from './wordpressCommentService';

// Re-export utilities
export {
  getArticleViews,
  getArticleImage,
  stripHtmlTags,
  formatDate,
  getArticleAuthor,
  getArticleCategories,
  getCategoryIds,
  convertToActuStarsUrl
} from '../utils/wordpressUtils';

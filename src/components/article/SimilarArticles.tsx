
import React from 'react';
import { Link } from 'react-router-dom';
import { WordPressArticle, getArticleImage, stripHtmlTags } from '../../services/wordpressService';
import NewsCard from '../NewsCard';

interface SimilarArticlesProps {
  articles: WordPressArticle[];
  isLoading: boolean;
}

const SimilarArticles: React.FC<SimilarArticlesProps> = ({ articles, isLoading }) => {
  if (isLoading) {
    return (
      <div className="py-4">
        <div className="animate-pulse space-y-3">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex flex-col">
              <div className="h-24 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-1"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="py-2 text-center text-gray-400 text-sm">
        Aucun article similaire trouvé
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map(article => (
        <NewsCard 
          key={article.id}
          id={article.id}
          title={article.title.rendered}
          image={getArticleImage(article)}
          excerpt={stripHtmlTags(article.excerpt.rendered).substring(0, 80) + '...'}
          className="mb-3"
        />
      ))}
    </div>
  );
};

export default SimilarArticles;

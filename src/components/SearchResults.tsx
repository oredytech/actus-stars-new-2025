
import React from 'react';
import NewsCard from './NewsCard';
import AdBanner from './AdBanner';
import { WordPressArticle, getArticleImage, stripHtmlTags, getArticleCategories } from '../services/wordpressService';

interface SearchResultsProps {
  results: WordPressArticle[];
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, query }) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <>
      <p className="mb-4 text-gray-800">{results.length} résultats trouvés pour "{query}"</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.slice(0, 3).map((article) => (
          <NewsCard 
            key={article.id}
            slug={article.slug}
            title={article.title.rendered}
            image={getArticleImage(article)}
            excerpt={stripHtmlTags(article.excerpt.rendered)}
            category={getArticleCategories(article)[0] || ''}
            className="h-full"
          />
        ))}
      </div>
      
      {results.length > 3 && (
        <div className="my-8">
          <AdBanner className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.slice(3).map((article) => (
              <NewsCard 
                key={article.id}
                slug={article.slug}
                title={article.title.rendered}
                image={getArticleImage(article)}
                excerpt={stripHtmlTags(article.excerpt.rendered)}
                category={getArticleCategories(article)[0] || ''}
                className="h-full"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResults;

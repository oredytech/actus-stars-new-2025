import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import NewsCard from './NewsCard';
import AdBanner from './AdBanner';
import LoadingSpinner from './LoadingSpinner';
import { fetchLatestArticles, stripHtmlTags, getArticleImage, WordPressArticle } from '../services/wordpressService';

const ArticlesSection: React.FC = () => {
  const [articles, setArticles] = useState<WordPressArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch a larger number of articles to have enough after excluding the top 5
        const fetchedArticles = await fetchLatestArticles(15);
        
        // Skip the first 5 articles (already shown in HeroSection)
        const remainingArticles = fetchedArticles.slice(5);
        
        setArticles(remainingArticles);
      } catch (err) {
        console.error('Error loading articles section:', err);
        setError("Erreur lors du chargement des articles");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadArticles();
  }, []);

  const formatExcerpt = (excerpt: string): string => {
    const plainText = stripHtmlTags(excerpt);
    return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
  };
  
  return (
    <section className="container mx-auto py-8 px-4">
      <SectionTitle title="DES ARTICLES" />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <LoadingSpinner size="md" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h2 className="text-mdh-red text-xl mb-4">Erreur de chargement</h2>
          <p className="text-white mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="lire-plus"
          >
            Réessayer
          </button>
        </div>
      ) : articles.length > 0 ? (
        <>
          {articles.length >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  <Link to={`/${articles[0].slug}`}>
                    <img 
                      src={getArticleImage(articles[0])} 
                      alt={stripHtmlTags(articles[0].title.rendered)}
                      className="w-full h-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/nord/300/200';
                      }}
                    />
                  </Link>
                </div>
                <div className="md:w-2/3">
                  <Link to={`/${articles[0].slug}`}>
                    <h3 className="text-white font-bold mb-2 hover:text-mdh-gold" dangerouslySetInnerHTML={{ __html: articles[0].title.rendered }}></h3>
                  </Link>
                  <p className="text-gray-300 text-sm mb-3">
                    {formatExcerpt(articles[0].excerpt.rendered)}
                  </p>
                  <Link to={`/${articles[0].slug}`} className="lire-plus">Lire Plus...</Link>
                </div>
              </div>
              
              {articles.length > 1 && (
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <Link to={`/${articles[1].slug}`}>
                      <img 
                        src={getArticleImage(articles[1])}
                        alt={stripHtmlTags(articles[1].title.rendered)}
                        className="w-full h-auto"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/title/300/200';
                        }}
                      />
                    </Link>
                  </div>
                  <div className="md:w-2/3">
                    <Link to={`/${articles[1].slug}`}>
                      <h3 className="text-white font-bold mb-2 hover:text-mdh-gold" dangerouslySetInnerHTML={{ __html: articles[1].title.rendered }}></h3>
                    </Link>
                    <p className="text-gray-300 text-sm mb-3">
                      {formatExcerpt(articles[1].excerpt.rendered)}
                    </p>
                    <Link to={`/${articles[1].slug}`} className="lire-plus">Lire Plus...</Link>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Bannière publicitaire stratégiquement placée avant la grille d'articles */}
          <AdBanner className="mb-8" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {articles.slice(2).map((article) => (
              <NewsCard 
                key={article.id}
                slug={`/${article.slug}`}
                title={stripHtmlTags(article.title.rendered)}
                image={getArticleImage(article)}
                excerpt={formatExcerpt(article.excerpt.rendered)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-white py-12">
          <h2 className="text-mdh-gold text-xl">Aucun article disponible</h2>
          <p className="mt-2">Veuillez réessayer plus tard.</p>
        </div>
      )}
    </section>
  );
};

export default ArticlesSection;

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';
import AdBanner from '../components/AdBanner';
import LoadingSpinner from '../components/LoadingSpinner';
import { searchArticles, WordPressArticle, getArticleImage, stripHtmlTags, getArticleCategories } from '../services/wordpressService';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get('q') || '');
  const [results, setResults] = useState<WordPressArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    setNoResults(false);
    setError(null);
    setSearchParams({ q: query });
    
    try {
      const articles = await searchArticles(query);
      setResults(articles);
      setNoResults(articles.length === 0);
    } catch (err) {
      console.error('Search error:', err);
      setError('Erreur lors de la recherche. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // On page load, if there's a query param, perform search
    const initialQuery = searchParams.get('q');
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch();
    }
    
    document.title = "Recherche - Actu Stars";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Rechercher des Articles</h1>
          
          <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <Input
              type="search"
              placeholder="Que recherchez-vous ?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" disabled={isLoading}>
              <Search className="mr-2" />
              {isLoading ? 'Recherche...' : 'Rechercher'}
            </Button>
          </form>
          
          {isLoading && (
            <div className="py-20 text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600">Recherche en cours...</p>
            </div>
          )}

          {error && (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => handleSearch()} 
                className="lire-plus"
              >
                Réessayer
              </button>
            </div>
          )}

          {!isLoading && !error && noResults && query && (
            <div className="py-20 text-center">
              <p className="text-lg font-medium">Aucun résultat trouvé pour "{query}"</p>
              <p className="mt-2 text-gray-600">Essayez avec d'autres mots-clés</p>
            </div>
          )}

          {!isLoading && !error && results.length > 0 && (
            <>
              <p className="mb-4 text-gray-700">{results.length} résultats trouvés pour "{query}"</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.slice(0, 3).map((article) => (
                  <NewsCard 
                    key={article.id}
                    id={article.id}
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
                        id={article.id}
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;

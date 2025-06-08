
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import { searchArticles, WordPressArticle } from '../services/wordpressService';

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
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Rechercher des Articles</h1>
          
          <SearchForm
            query={query}
            isLoading={isLoading}
            onQueryChange={setQuery}
            onSubmit={handleSearch}
          />
          
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
              <p className="text-lg font-medium text-gray-800">Aucun résultat trouvé pour "{query}"</p>
              <p className="mt-2 text-gray-600">Essayez avec d'autres mots-clés</p>
            </div>
          )}

          {!isLoading && !error && (
            <SearchResults results={results} query={query} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;

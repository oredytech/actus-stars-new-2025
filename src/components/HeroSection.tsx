import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import LoadingSpinner from './LoadingSpinner';
import { fetchLatestArticles, getArticleImage, stripHtmlTags, WordPressArticle } from '../services/wordpressService';

const HeroSection: React.FC = () => {
  const [articles, setArticles] = useState<WordPressArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const SLIDE_INTERVAL = 7000; // 7 seconds

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedArticles = await fetchLatestArticles(5);
        if (fetchedArticles.length === 0) {
          throw new Error("Aucun article disponible");
        }
        setArticles(fetchedArticles);
      } catch (err) {
        console.error('Error loading hero articles:', err);
        setError(err instanceof Error ? err.message : "Erreur lors du chargement");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadArticles();
  }, []);

  const handleNext = useCallback(() => {
    if (!api) return;
    api.scrollNext();
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  }, [api, articles.length]);

  const handlePrev = useCallback(() => {
    if (!api) return;
    api.scrollPrev();
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  }, [api, articles.length]);

  // Update index when API changes slide
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };
    
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  // Auto-slide functionality
  useEffect(() => {
    if (articles.length === 0 || !api) return;
    
    const intervalId = setInterval(() => {
      handleNext();
    }, SLIDE_INTERVAL);
    
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [articles.length, handleNext, api]);

  const formatExcerpt = (excerpt: string): string => {
    const plainText = stripHtmlTags(excerpt);
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  };

  // Get current background image
  const getCurrentBackgroundImage = () => {
    if (articles.length > 0 && articles[currentIndex]) {
      return getArticleImage(articles[currentIndex]);
    }
    return null;
  };

  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Background image with opacity */}
      {getCurrentBackgroundImage() && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${getCurrentBackgroundImage()})`,
            opacity: 0.8,
            zIndex: 1
          }}
        />
      )}
      
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      <div className="relative z-20 container mx-auto py-6 px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-48 md:h-64">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-center text-white py-12">
            <h2 className="text-mdh-red text-xl mb-4">Erreur de chargement</h2>
            <p className="mt-2 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="lire-plus"
            >
              Réessayer
            </button>
          </div>
        ) : articles.length > 0 ? (
          <Carousel 
            className="w-full" 
            opts={{ 
              align: "start",
              loop: true
            }}
            setApi={setApi}
          >
            <CarouselContent>
              {articles.map((article, index) => (
                <CarouselItem key={article.id}>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-center h-full">
                    <div className="text-white animate-slideIn">
                      <Link to={`/article/${article.id}`}>
                        <h1 className="text-mdh-gold text-xl md:text-2xl font-bold mb-3 hover:text-white" 
                            dangerouslySetInnerHTML={{ __html: article.title.rendered }}>
                        </h1>
                      </Link>
                      <p className="text-sm md:text-base mb-3 line-clamp-4">
                        {formatExcerpt(article.excerpt.rendered)}
                      </p>
                      <Link to={`/article/${article.id}`} className="lire-plus">
                        Lire Plus...
                      </Link>
                    </div>
                    <div className="animate-fadeIn max-h-[300px] overflow-hidden">
                      <Link to={`/article/${article.id}`}>
                        <img 
                          src={getArticleImage(article)} 
                          alt={stripHtmlTags(article.title.rendered)} 
                          className="w-full h-auto shadow-lg object-cover rounded-md max-h-[300px]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://picsum.photos/600/400?grayscale';
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" onClick={handlePrev} />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" onClick={handleNext} />
          </Carousel>
        ) : (
          <div className="text-center text-white py-12">
            <h2 className="text-mdh-gold text-xl">Aucun article disponible</h2>
            <p className="mt-2">Veuillez réessayer plus tard.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

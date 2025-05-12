
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { fetchLatestArticles, getArticleImage, stripHtmlTags, WordPressArticle } from '../services/wordpressService';

const HeroSection: React.FC = () => {
  const [articles, setArticles] = useState<WordPressArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const SLIDE_INTERVAL = 7000; // 7 seconds

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      const fetchedArticles = await fetchLatestArticles(5);
      setArticles(fetchedArticles);
      setIsLoading(false);
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

  return (
    <section className="relative w-full bg-black overflow-hidden">
      <div className="container mx-auto py-6 px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-48 md:h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mdh-gold"></div>
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
                      <h1 className="text-mdh-gold text-xl md:text-2xl font-bold mb-3" 
                          dangerouslySetInnerHTML={{ __html: article.title.rendered }}>
                      </h1>
                      <p className="text-sm md:text-base mb-3 line-clamp-4">
                        {formatExcerpt(article.excerpt.rendered)}
                      </p>
                      <a href={article.link} target="_blank" rel="noopener noreferrer" className="lire-plus">
                        Lire Plus...
                      </a>
                    </div>
                    <div className="animate-fadeIn max-h-[300px] overflow-hidden">
                      <img 
                        src={getArticleImage(article)} 
                        alt={stripHtmlTags(article.title.rendered)} 
                        className="w-full h-auto shadow-lg object-cover rounded-md max-h-[300px]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://picsum.photos/600/400?grayscale';
                        }}
                      />
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

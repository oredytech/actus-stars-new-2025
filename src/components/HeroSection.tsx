
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { fetchLatestArticles, getArticleImage, stripHtmlTags, WordPressArticle } from '../services/wordpressService';

const HeroSection: React.FC = () => {
  const [articles, setArticles] = useState<WordPressArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      const fetchedArticles = await fetchLatestArticles(5);
      setArticles(fetchedArticles);
      setIsLoading(false);
    };
    
    loadArticles();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const formatExcerpt = (excerpt: string): string => {
    const plainText = stripHtmlTags(excerpt);
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  };

  return (
    <section className="relative w-full bg-black overflow-hidden" style={{ minHeight: "300px" }}>
      <div className="container mx-auto py-8 px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mdh-gold"></div>
          </div>
        ) : articles.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent>
              {articles.map((article, index) => (
                <CarouselItem key={article.id}>
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="text-white animate-slideIn">
                      <h1 className="text-mdh-gold text-xl md:text-2xl font-bold mb-4" 
                          dangerouslySetInnerHTML={{ __html: article.title.rendered }}>
                      </h1>
                      <p className="text-sm md:text-base mb-4">
                        {formatExcerpt(article.excerpt.rendered)}
                      </p>
                      <a href={article.link} target="_blank" rel="noopener noreferrer" className="lire-plus">
                        Lire Plus...
                      </a>
                    </div>
                    <div className="animate-fadeIn">
                      <img 
                        src={getArticleImage(article)} 
                        alt={stripHtmlTags(article.title.rendered)} 
                        className="w-full h-auto shadow-lg object-cover"
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
          <div className="text-center text-white py-16">
            <h2 className="text-mdh-gold text-xl">Aucun article disponible</h2>
            <p className="mt-2">Veuillez réessayer plus tard.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

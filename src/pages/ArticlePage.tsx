import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArticleContent from '../components/ArticleContent';
import ArticleSidebar from '../components/article/ArticleSidebar';
import SimilarArticlesSection from '../components/article/SimilarArticlesSection';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  fetchArticleBySlug, 
  WordPressArticle, 
  getArticleImage,
  formatDate,
  getArticleAuthor,
  getArticleCategories,
  getArticleViews
} from '../services/wordpressService';
import { toast } from '../components/ui/use-toast';

// Plugin: post-views-counter/post-views-counter.php, Fonction: views
export function usePostViewsCounterViews() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/wp-json/otapi/v1/post-views-counter/views")
      .then(res => res.json())
      .then(setData);
  }, []);
  return data;
}

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<WordPressArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const viewsData = usePostViewsCounterViews();

  useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true);
      setError(null);
      window.scrollTo(0, 0);
      
      if (!slug) {
        setError("Aucun slug d'article trouvé");
        setIsLoading(false);
        toast({
          title: "Erreur",
          description: "Aucun slug d'article trouvé",
          variant: "destructive",
        });
        return;
      }

      try {
        const fetchedArticle = await fetchArticleBySlug(slug);
        
        if (fetchedArticle) {
          setArticle(fetchedArticle);
          document.title = `MDHTV - ${fetchedArticle.title.rendered}`;
        } else {
          throw new Error("Article non trouvé");
        }
      } catch (err) {
        console.error('Error loading article:', err);
        setError(err instanceof Error ? err.message : "Erreur lors du chargement de l'article");
        toast({
          title: "Erreur",
          description: "Impossible de charger l'article. Veuillez réessayer.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadArticle();
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col bg-mdh-dark">
      <Navbar />
      <main className="flex-grow">
        {isLoading ? (
          <div className="container mx-auto py-12 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="container mx-auto py-12 text-center">
            <h2 className="text-mdh-red text-2xl mb-4">Erreur de chargement</h2>
            <p className="text-white mb-6">{error}</p>
            <div className="space-x-4">
              <button 
                onClick={() => window.location.reload()} 
                className="lire-plus"
              >
                Réessayer
              </button>
              <Link to="/" className="lire-plus">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        ) : article ? (
          <div className="container mx-auto py-6 px-4">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center text-mdh-gold hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux articles
              </Link>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <article className="flex-1">
                <header className="mb-8">
                  <h1 
                    className="text-2xl md:text-4xl font-bold text-white mb-4"
                    dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                  ></h1>
                  
                  <div className="flex flex-wrap gap-4 items-center text-sm text-gray-400 mb-4">
                    {article.date && (
                      <div className="flex items-center">
                        <span className="mr-1">Publié le:</span>
                        <time dateTime={article.date}>{formatDate(article.date)}</time>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <span className="mr-1">Par:</span>
                      <span>{getArticleAuthor(article)}</span>
                    </div>

                    {getArticleViews(article) > 0 && (
                      <div className="flex items-center">
                        <Eye className="mr-1 h-4 w-4" />
                        <span>{getArticleViews(article)} vues</span>
                      </div>
                    )}
                    
                    {getArticleCategories(article).length > 0 && (
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="mr-1">Catégories:</span>
                        {getArticleCategories(article).map((category, index) => (
                          <span 
                            key={index}
                            className="bg-mdh-red px-2 py-1 text-xs text-white rounded"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </header>
                
                <div className="mb-4 rounded-lg overflow-hidden max-h-[500px]">
                  <img 
                    src={getArticleImage(article)} 
                    alt={article.title.rendered}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://picsum.photos/800/400?grayscale';
                    }}
                  />
                </div>

                {viewsData && (
                  <div className="mb-8 flex items-center justify-center text-gray-400 text-sm">
                    <Eye className="mr-2 h-4 w-4" />
                    <span>{viewsData} vues</span>
                  </div>
                )}
                
                <div className="prose prose-invert prose-md max-w-none">
                  {article.content && (
                    <ArticleContent content={article.content.rendered} />
                  )}
                </div>

                <SimilarArticlesSection article={article} />
              </article>
              
              <aside className="lg:w-80 w-full">
                <ArticleSidebar article={article} />
              </aside>
            </div>
          </div>
        ) : (
          <div className="container mx-auto py-12 text-center">
            <h2 className="text-mdh-gold text-2xl mb-4">Article non trouvé</h2>
            <p className="text-white mb-6">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
            <Link to="/" className="lire-plus">
              Retour à l'accueil
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;

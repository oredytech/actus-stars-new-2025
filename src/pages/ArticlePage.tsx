
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArticleContent from '../components/ArticleContent';
import { 
  fetchArticleById, 
  WordPressArticle, 
  getArticleImage,
  formatDate,
  getArticleAuthor,
  getArticleCategories
} from '../services/wordpressService';
import { toast } from '../components/ui/use-toast';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<WordPressArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true);
      window.scrollTo(0, 0);
      
      if (!id) {
        toast({
          title: "Erreur",
          description: "Aucun identifiant d'article trouvé",
          variant: "destructive",
        });
        return;
      }

      const articleId = parseInt(id);
      const fetchedArticle = await fetchArticleById(articleId);
      
      if (fetchedArticle) {
        setArticle(fetchedArticle);
        document.title = `MDHTV - ${fetchedArticle.title.rendered}`;
      } else {
        toast({
          title: "Erreur",
          description: "Article non trouvé",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    };
    
    loadArticle();
  }, [id]);

  const handleShare = () => {
    if (navigator.share && article) {
      navigator.share({
        title: article.title.rendered,
        url: window.location.href,
      }).catch((error) => console.log('Erreur de partage:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié",
        description: "Le lien de l'article a été copié dans votre presse-papiers",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-mdh-dark">
      <Navbar />
      <main className="flex-grow">
        {isLoading ? (
          <div className="container mx-auto py-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mdh-gold"></div>
          </div>
        ) : article ? (
          <article className="container mx-auto py-6 px-4">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center text-mdh-gold hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux articles
              </Link>
            </div>
            
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
                
                <button 
                  onClick={handleShare}
                  className="flex items-center text-mdh-gold hover:text-white"
                >
                  <Share className="mr-1 h-4 w-4" />
                  Partager
                </button>
              </div>
            </header>
            
            <div className="mb-8 rounded-lg overflow-hidden max-h-[500px]">
              <img 
                src={getArticleImage(article)} 
                alt={article.title.rendered}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://picsum.photos/800/400?grayscale';
                }}
              />
            </div>
            
            <div className="prose prose-invert prose-md max-w-none">
              {article.content && (
                <ArticleContent content={article.content.rendered} />
              )}
            </div>
          </article>
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

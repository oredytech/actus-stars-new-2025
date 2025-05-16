
import React, { useEffect, useState } from 'react';
import { 
  WordPressArticle, 
  WordPressComment, 
  fetchComments, 
  fetchSimilarArticles, 
  submitComment,
  getCategoryIds
} from '../../services/wordpressService';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import ShareButtons from './ShareButtons';
import SimilarArticles from './SimilarArticles';

interface ArticleSidebarProps {
  article: WordPressArticle;
}

const ArticleSidebar: React.FC<ArticleSidebarProps> = ({ article }) => {
  const [comments, setComments] = useState<WordPressComment[]>([]);
  const [similarArticles, setSimilarArticles] = useState<WordPressArticle[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      setIsLoadingComments(true);
      const fetchedComments = await fetchComments(article.id);
      setComments(fetchedComments);
      setIsLoadingComments(false);
    };

    const loadSimilarArticles = async () => {
      setIsLoadingSimilar(true);
      const categoryIds = getCategoryIds(article);
      const fetchedArticles = await fetchSimilarArticles(categoryIds, article.id);
      setSimilarArticles(fetchedArticles);
      setIsLoadingSimilar(false);
    };

    loadComments();
    loadSimilarArticles();
  }, [article.id]);

  const handleCommentSubmit = async (name: string, email: string, content: string) => {
    return await submitComment(article.id, name, email, content);
  };

  return (
    <div className="space-y-6 w-full max-w-sm">
      <Card className="bg-mdh-darkCard border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Partagez cet article</CardTitle>
        </CardHeader>
        <CardContent>
          <ShareButtons 
            title={article.title.rendered} 
            url={window.location.href} 
          />
        </CardContent>
      </Card>

      <Card className="bg-mdh-darkCard border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Commentaires récents</CardTitle>
        </CardHeader>
        <CardContent>
          <CommentsList comments={comments} isLoading={isLoadingComments} />
        </CardContent>
      </Card>

      <Card className="bg-mdh-darkCard border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Laissez un commentaire</CardTitle>
        </CardHeader>
        <CardContent>
          <CommentForm postId={article.id} onCommentSubmit={handleCommentSubmit} />
        </CardContent>
      </Card>

      <Card className="bg-mdh-darkCard border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Articles similaires</CardTitle>
        </CardHeader>
        <CardContent>
          <SimilarArticles articles={similarArticles} isLoading={isLoadingSimilar} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleSidebar;

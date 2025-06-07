
import React, { useEffect, useState } from 'react';
import { 
  WordPressArticle, 
  WordPressComment, 
  fetchComments, 
  fetchSimilarArticles, 
  submitComment,
  getCategoryIds,
  getArticleViews
} from '../../services/wordpressService';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Eye } from 'lucide-react';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import ShareButtons from './ShareButtons';

interface ArticleSidebarProps {
  article: WordPressArticle;
}

const ArticleSidebar: React.FC<ArticleSidebarProps> = ({ article }) => {
  const [comments, setComments] = useState<WordPressComment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      setIsLoadingComments(true);
      const fetchedComments = await fetchComments(article.id, 3);
      setComments(fetchedComments);
      setIsLoadingComments(false);
    };

    loadComments();
  }, [article.id]);

  const handleCommentSubmit = async (name: string, email: string, content: string) => {
    const success = await submitComment(article.id, name, email, content);
    if (success) {
      // Recharger les commentaires après soumission
      const updatedComments = await fetchComments(article.id, 3);
      setComments(updatedComments);
    }
    return success;
  };

  const articleViews = getArticleViews(article);

  return (
    <div className="space-y-6 w-full max-w-sm sticky top-6">
      <Card className="bg-mdh-darkCard border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Partagez cet article</CardTitle>
        </CardHeader>
        <CardContent>
          {articleViews > 0 && (
            <div className="flex items-center gap-2 mb-4 text-gray-400">
              <Eye size={16} />
              <span className="text-sm">{articleViews} vues</span>
            </div>
          )}
          <ShareButtons 
            title={article.title.rendered} 
            url={window.location.href}
            slug={article.slug}
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
    </div>
  );
};

export default ArticleSidebar;

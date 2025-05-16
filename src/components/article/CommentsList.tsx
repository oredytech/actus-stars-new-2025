
import React from 'react';
import { WordPressComment } from '../../services/wordpressService';
import { formatDate, stripHtmlTags } from '../../services/wordpressService';
import { ScrollArea } from '../ui/scroll-area';

interface CommentsListProps {
  comments: WordPressComment[];
  isLoading: boolean;
}

const CommentsList: React.FC<CommentsListProps> = ({ comments, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-mdh-gold"></div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="py-4 text-center text-gray-400">
        Aucun commentaire pour le moment. Soyez le premier à commenter!
      </div>
    );
  }

  return (
    <ScrollArea className="h-[320px] pr-4">
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4 pb-4 border-b border-gray-800 last:border-0">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 mr-2">
              {comment.author_avatar_urls?.['48'] ? (
                <img 
                  src={comment.author_avatar_urls['48']} 
                  alt={comment.author_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white bg-mdh-gold">
                  {comment.author_name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <div className="font-semibold text-sm text-white">{comment.author_name}</div>
              <div className="text-xs text-gray-400">{formatDate(comment.date)}</div>
            </div>
          </div>
          <div 
            className="text-sm text-gray-300 comment-content"
            dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
          />
        </div>
      ))}
    </ScrollArea>
  );
};

export default CommentsList;

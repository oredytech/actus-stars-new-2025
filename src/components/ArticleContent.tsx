
import React from 'react';
import AdBanner from './AdBanner';

interface ArticleContentProps {
  content: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  if (!content) return null;
  
  // Diviser le contenu en paragraphes
  const paragraphRegex = /<p[^>]*>[\s\S]*?<\/p>/g;
  const paragraphs = content.match(paragraphRegex) || [];
  
  // Si moins de 2 paragraphes, afficher simplement le contenu
  if (paragraphs.length < 2) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  
  // Sinon, insérer la publicité après le 2ème paragraphe
  return (
    <div className="article-content">
      <div dangerouslySetInnerHTML={{ __html: paragraphs.slice(0, 2).join('') }} />
      <AdBanner />
      <div dangerouslySetInnerHTML={{ __html: paragraphs.slice(2).join('') }} />
    </div>
  );
};

export default ArticleContent;

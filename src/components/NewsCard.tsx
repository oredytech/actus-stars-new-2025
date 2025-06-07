
import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsCardProps {
  title: string;
  image: string;
  excerpt?: string;
  isVideo?: boolean;
  category?: string;
  style?: React.CSSProperties;
  className?: string;
  id?: number;
  slug?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  title, 
  image, 
  excerpt, 
  isVideo = false,
  category,
  style,
  className = "",
  id,
  slug
}) => {
  const renderContent = () => (
    <>
      <div className={isVideo ? "video-thumb-overlay" : "relative"}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-auto object-cover" 
          style={{ aspectRatio: "16/9" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/fallback/300/200';
          }}
        />
        {isVideo && (
          <div className="play-button">
            <Play fill="white" size={24} />
          </div>
        )}
        {category && (
          <span className="absolute top-2 left-2 bg-mdh-gold text-black text-xs px-2 py-1">
            {category}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-white text-sm md:text-base font-bold mb-2 hover:text-mdh-gold">{title}</h3>
        {excerpt && <p className="text-gray-300 text-xs mb-3">{excerpt}</p>}
        <span className="lire-plus">Lire Plus...</span>
      </div>
    </>
  );

  const linkPath = slug || (id ? `/article/${id}` : '#');

  return (
    <Link 
      to={linkPath} 
      className={`bg-mdh-darkCard mb-4 overflow-hidden animate-fadeIn block ${className}`}
      style={style}
    >
      {renderContent()}
    </Link>
  );
};

export default NewsCard;

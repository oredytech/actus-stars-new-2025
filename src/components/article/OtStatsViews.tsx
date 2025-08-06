import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface OtStatsViewsProps {
  postId: number;
  className?: string;
}

const OtStatsViews: React.FC<OtStatsViewsProps> = ({ postId, className = "" }) => {
  const [displayViews, setDisplayViews] = useState<number>(0);
  const [realViews, setRealViews] = useState<number>(0);
  const [totalViews, setTotalViews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        setIsLoading(true);
        
        // Récupérer les vues d'affichage (personnalisées ou par défaut)
        const displayResponse = await fetch(`https://actustars.net/wp-json/otstats/v1/display-views/${postId}`);
        const displayData = await displayResponse.json();
        
        // Récupérer les vues réelles des visiteurs
        const realResponse = await fetch(`https://actustars.net/wp-json/otstats/v1/views/${postId}`);
        const realData = await realResponse.json();
        
        const displayViewsCount = displayData.views || 0;
        const realViewsCount = realData.views || 0;
        const total = displayViewsCount + realViewsCount;
        
        setDisplayViews(displayViewsCount);
        setRealViews(realViewsCount);
        setTotalViews(total);
        
        // Tracker cette vue
        await fetch(`https://actustars.net/wp-json/otstats/v1/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ post_id: postId }),
        }).catch(() => {}); // Ignore les erreurs de tracking
        
      } catch (error) {
        console.error('Erreur lors de la récupération des vues:', error);
        setTotalViews(0);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchViews();
    }
  }, [postId]);

  if (isLoading) {
    return (
      <div className={`flex items-center text-gray-400 ${className}`}>
        <Eye className="mr-1 h-4 w-4" />
        <span>...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center text-gray-400 ${className}`}>
      <Eye className="mr-1 h-4 w-4" />
      <span>{totalViews.toLocaleString()} vues</span>
    </div>
  );
};

export default OtStatsViews;
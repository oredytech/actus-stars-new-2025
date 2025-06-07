
import React, { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import YouTubeVideoCard from './YouTubeVideoCard';
import AdBanner from './AdBanner';
import LoadingSpinner from './LoadingSpinner';
import { fetchLatestYouTubeVideos, YouTubeVideo } from '../services/youtubeService';

const RecentNews: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedVideos = await fetchLatestYouTubeVideos(3);
        setVideos(fetchedVideos);
      } catch (err) {
        console.error('Error loading YouTube videos:', err);
        setError("Erreur lors du chargement des vidéos");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVideos();
  }, []);

  return (
    <section className="container mx-auto py-8 px-4">
      <SectionTitle title="DERNIEREMENT SUR LA CHAINE" />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <LoadingSpinner size="md" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h2 className="text-mdh-red text-xl mb-4">Erreur de chargement</h2>
          <p className="text-white mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="lire-plus"
          >
            Réessayer
          </button>
        </div>
      ) : videos.length > 0 ? (
        <>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {videos.map((video) => (
              <YouTubeVideoCard key={video.id} video={video} />
            ))}
          </div>
          
          {/* Petite bannière publicitaire */}
          <AdBanner variant="small" className="mt-4" />
        </>
      ) : (
        <div className="text-center text-white py-12">
          <h2 className="text-mdh-gold text-xl">Aucune vidéo disponible</h2>
          <p className="mt-2">Veuillez réessayer plus tard.</p>
        </div>
      )}
    </section>
  );
};

export default RecentNews;

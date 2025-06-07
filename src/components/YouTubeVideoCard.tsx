
import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { YouTubeVideo } from '../services/youtubeService';

interface YouTubeVideoCardProps {
  video: YouTubeVideo;
}

const YouTubeVideoCard: React.FC<YouTubeVideoCardProps> = ({ video }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div 
        className="bg-mdh-darkCard overflow-hidden animate-fadeIn cursor-pointer group"
        onClick={openModal}
      >
        <div className="relative">
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300" 
            style={{ aspectRatio: "16/9" }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play fill="white" size={32} className="text-white" />
          </div>
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            VIDÉO
          </span>
        </div>
        <div className="p-3">
          <h3 className="text-white text-sm font-bold mb-2 line-clamp-2 group-hover:text-mdh-gold">
            {video.title}
          </h3>
          <span className="lire-plus">Regarder...</span>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{video.title}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YouTubeVideoCard;


import React from 'react';
import { Megaphone } from 'lucide-react';

interface AdBannerProps {
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className = "" }) => {
  return (
    <div className={`my-6 py-4 px-3 bg-gray-800 bg-opacity-50 rounded-md border border-mdh-gold border-opacity-30 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Megaphone className="h-5 w-5 text-mdh-gold mr-2" />
          <span className="text-xs text-gray-400">PUBLICITÉ</span>
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <div className="bg-gray-700 bg-opacity-40 p-4 rounded-md w-full max-w-3xl">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-mdh-darkCard rounded-md flex items-center justify-center">
                <span className="text-mdh-gold">Ad Space</span>
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-mdh-gold font-medium mb-1">Titre de publicité</h3>
              <p className="text-sm text-gray-300">Votre publicité pourrait apparaître ici. Contactez-nous pour plus d'informations sur nos offres publicitaires.</p>
              <button className="mt-2 bg-mdh-gold text-black text-xs px-3 py-1 rounded hover:bg-opacity-80 transition-colors">
                Plus d'infos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;

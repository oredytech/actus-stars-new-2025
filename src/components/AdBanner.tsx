
import React from 'react';
import { Megaphone } from 'lucide-react';

interface AdBannerProps {
  className?: string;
  variant?: 'default' | 'large' | 'small';
}

const AdBanner: React.FC<AdBannerProps> = ({
  className = "",
  variant = 'default'
}) => {
  // Sélection aléatoire d'une des images Eden Technology pour varier l'affichage
  const adImages = [
    '/lovable-uploads/3e233b19-0a17-4304-9e26-6e90d8a14f13.png', 
    '/lovable-uploads/7b8e0912-797c-4951-9dc2-53d1bcfe010e.png', 
    '/lovable-uploads/aef7eaf7-c097-4f05-bfb9-3e22ccc6d361.png', 
    '/lovable-uploads/240620b4-7178-4653-b0a1-9ad8ff1e4a60.png',
    '/lovable-uploads/def10a55-8607-47dc-9bfb-9d9cef781f15.png',
    '/lovable-uploads/08e7d43f-792f-480d-b12e-0487160d3465.png',
    '/lovable-uploads/4743c370-abec-4b99-956d-32efb0aae20e.png',
    '/lovable-uploads/c02bce81-99c1-4c27-bf58-1c42a00d1d00.png',
    '/lovable-uploads/a92c2a75-960e-4087-bdb8-01fc89a02866.png'
  ];

  // Sélection aléatoire mais fixe pour cette instance
  const randomIndex = Math.floor(Math.random() * adImages.length);
  const selectedImage = adImages[randomIndex];

  // Textes publicitaires pour Eden Technology
  const slogans = [
    "Eden Technology - La communication instantanée pour toutes les entreprises", 
    "L'innovation n'attend pas - Eden Technology", 
    "Technologie de l'information, Réseaux de communication, Suivi des véhicules", 
    "Découvrez la révolution technologique avec Eden Technology!",
    "La fibre optique c'est nous ! - Eden Technology"
  ];
  const randomSlogan = slogans[randomIndex % slogans.length];

  if (variant === 'small') {
    return (
      <div className={`bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-3 ${className}`}>
        <div className="flex items-center gap-3">
          <img 
            src={selectedImage} 
            alt="Eden Technology" 
            className="w-12 h-12 object-cover rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/edentech/48/48';
            }}
          />
          <div className="flex-1">
            <p className="text-white text-xs font-semibold">{randomSlogan}</p>
          </div>
          <Megaphone className="text-white w-4 h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-center ${className}`}>
      <div className="flex items-center justify-center gap-4 mb-4">
        <Megaphone className="text-white w-8 h-8" />
        <h3 className="text-white text-xl font-bold">Publicité</h3>
      </div>
      
      <div className="mb-4">
        <img 
          src={selectedImage} 
          alt="Eden Technology" 
          className="mx-auto max-h-48 w-full object-contain rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/edentech/300/200';
          }}
        />
      </div>
      
      <p className="text-white text-lg font-semibold mb-2">{randomSlogan}</p>
      <p className="text-blue-100 text-sm">Solutions technologiques innovantes</p>
    </div>
  );
};

export default AdBanner;

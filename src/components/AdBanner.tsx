
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
  // Sélection aléatoire d'une des images Power7 pour varier l'affichage
  const adImages = [
    '/lovable-uploads/8803fd2d-7f6c-4e5f-a29f-a908625aa62d.png', 
    '/lovable-uploads/61cccc3a-767d-4004-9058-3078bbd85ac0.png', 
    '/lovable-uploads/94ffae71-c7cd-4907-a665-a59942b43d52.png', 
    '/lovable-uploads/2b8e14fc-98d5-4d9f-82a3-6efa27c49183.png', 
    '/lovable-uploads/598ca509-e165-459a-933f-febf6c88427a.png'
  ];

  // Sélection aléatoire mais fixe pour cette instance
  const randomIndex = Math.floor(Math.random() * adImages.length);
  const selectedImage = adImages[randomIndex];

  // Textes publicitaires pour Power7 Water
  const slogans = [
    "POWER7 🔹 l'eau préférable dans toute l'étendue de l'Afrique 💦", 
    "Eau Minérale Naturelle Pure", 
    "Buvons tous POWER 7 Water", 
    "Pour vos besoins liés aux soifs et voilà la réponse à ça...Power7 water 😎"
  ];
  const randomSlogan = slogans[randomIndex % slogans.length];

  if (variant === 'small') {
    return (
      <div className={`bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-3 ${className}`}>
        <div className="flex items-center gap-3">
          <img 
            src={selectedImage} 
            alt="Power7 Water" 
            className="w-12 h-12 object-contain rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/power7/48/48';
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
          alt="Power7 Water" 
          className="mx-auto max-h-32 object-contain rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/power7/200/128';
          }}
        />
      </div>
      
      <p className="text-white text-lg font-semibold mb-2">{randomSlogan}</p>
      <p className="text-blue-100 text-sm">Votre partenaire hydratation de confiance</p>
    </div>
  );
};

export default AdBanner;

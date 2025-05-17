
import React from 'react';
import { Megaphone } from 'lucide-react';

interface AdBannerProps {
  className?: string;
  variant?: 'default' | 'large';
}

const AdBanner: React.FC<AdBannerProps> = ({ className = "", variant = 'default' }) => {
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
          {variant === 'large' ? (
            <div className="flex flex-col items-center">
              <img 
                src={selectedImage} 
                alt="Power7 Water"
                className="w-full max-w-md rounded-md shadow-lg mb-3"
              />
              <div className="text-center mt-2">
                <h3 className="text-mdh-gold font-medium text-lg">Power7 Water</h3>
                <p className="text-white">{randomSlogan}</p>
                <p className="text-xs text-gray-300 mt-2">Produit à Beni, R.D Congo par Au Triumphal sarl</p>
                <p className="text-xs text-gray-300">Tel: +243-852-889-907 | Email: 7powersat@gmail.com</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-shrink-0">
                <img 
                  src={selectedImage}
                  alt="Power7 Water" 
                  className="w-24 h-24 object-cover rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-mdh-gold font-medium mb-1">Power7 Water</h3>
                <p className="text-sm text-gray-300">{randomSlogan}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-gray-400 mr-2">Produit à Beni, RDC</span>
                  <a 
                    href="tel:+243852889907" 
                    className="bg-mdh-gold text-black text-xs px-3 py-1 rounded hover:bg-opacity-80 transition-colors"
                  >
                    Contactez-nous
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdBanner;

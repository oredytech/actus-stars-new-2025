import React from 'react';
import { Megaphone } from 'lucide-react';
interface AdBannerProps {
  className?: string;
  variant?: 'default' | 'large';
}
const AdBanner: React.FC<AdBannerProps> = ({
  className = "",
  variant = 'default'
}) => {
  // Sélection aléatoire d'une des images Power7 pour varier l'affichage
  const adImages = ['/lovable-uploads/8803fd2d-7f6c-4e5f-a29f-a908625aa62d.png', '/lovable-uploads/61cccc3a-767d-4004-9058-3078bbd85ac0.png', '/lovable-uploads/94ffae71-c7cd-4907-a665-a59942b43d52.png', '/lovable-uploads/2b8e14fc-98d5-4d9f-82a3-6efa27c49183.png', '/lovable-uploads/598ca509-e165-459a-933f-febf6c88427a.png'];

  // Sélection aléatoire mais fixe pour cette instance
  const randomIndex = Math.floor(Math.random() * adImages.length);
  const selectedImage = adImages[randomIndex];

  // Textes publicitaires pour Power7 Water
  const slogans = ["POWER7 🔹 l'eau préférable dans toute l'étendue de l'Afrique 💦", "Eau Minérale Naturelle Pure", "Buvons tous POWER 7 Water", "Pour vos besoins liés aux soifs et voilà la réponse à ça...Power7 water 😎"];
  const randomSlogan = slogans[randomIndex % slogans.length];
  return;
};
export default AdBanner;

import React from 'react';
import { Share, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { convertToActuStarsUrl } from '../../services/wordpressService';

interface ShareButtonsProps {
  title: string;
  url: string;
  slug: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, slug }) => {
  const actuStarsUrl = convertToActuStarsUrl(url, slug);
  const encodedUrl = encodeURIComponent(actuStarsUrl);
  const encodedTitle = encodeURIComponent(title);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        url: actuStarsUrl,
      }).catch((error) => console.log('Erreur de partage:', error));
    } else {
      navigator.clipboard.writeText(actuStarsUrl);
      toast({
        title: "Lien copié",
        description: "Le lien de l'article a été copié dans votre presse-papiers",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button 
        variant="outline" 
        className="flex items-center justify-center gap-2 bg-transparent border-mdh-gold/50 text-mdh-gold hover:bg-mdh-gold/10"
        onClick={handleShare}
      >
        <Share size={16} />
        Partager le lien
      </Button>
      
      <div className="grid grid-cols-2 gap-2">
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#1877F2] text-white p-2 rounded-md hover:bg-[#1877F2]/80 text-sm"
        >
          Facebook
        </a>
        
        <a 
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#1DA1F2] text-white p-2 rounded-md hover:bg-[#1DA1F2]/80 text-sm"
        >
          Twitter
        </a>
        
        <a 
          href={`https://wa.me/?text=${encodedTitle} ${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] text-white p-2 rounded-md hover:bg-[#25D366]/80 text-sm"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
        
        <a 
          href={`mailto:?subject=${encodedTitle}&body=Consultez cet article: ${actuStarsUrl}`}
          className="flex items-center justify-center gap-2 bg-gray-600 text-white p-2 rounded-md hover:bg-gray-600/80 text-sm"
        >
          <ExternalLink size={16} />
          Email
        </a>
      </div>
    </div>
  );
};

export default ShareButtons;

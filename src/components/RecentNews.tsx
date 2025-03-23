
import React from 'react';
import SectionTitle from './SectionTitle';
import NewsCard from './NewsCard';

const RecentNews: React.FC = () => {
  return (
    <section className="container mx-auto py-8 px-4">
      <SectionTitle title="DERNIEREMENT SUR LA CHAINE" />
      
      <div className="grid md:grid-cols-3 gap-4">
        <NewsCard 
          title="BIBLIOTHÈQUE AUDIO" 
          image="https://picsum.photos/seed/audio/600/400"
          isVideo={true}
        />
        
        <NewsCard 
          title="KIVU SÉLECTION" 
          image="https://picsum.photos/seed/kivu/600/400"
          isVideo={true}
        />
        
        <NewsCard 
          title="Comment connecter facilement votre PC..." 
          image="https://picsum.photos/seed/wifi/600/400"
          excerpt="Vous avez du mal à connecter votre PC à votre nouveau projecteur 5G WiFi parce qu'il n'a pas de ports HDMI ni VGA ? Pas de..."
          isVideo={true}
        />
      </div>
    </section>
  );
};

export default RecentNews;


import React from 'react';
import SectionTitle from './SectionTitle';
import NewsCard from './NewsCard';

const ArticlesSection: React.FC = () => {
  const placeholderText = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque error aliquam eveniet deleniti soluta. Neque...";
  
  return (
    <section className="container mx-auto py-8 px-4">
      <SectionTitle title="DES ARTICLES" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3">
            <img 
              src="https://picsum.photos/seed/nord/300/200" 
              alt="Nord-Kivu" 
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className="text-white font-bold mb-2">Nord-Kivu: « on n...</h3>
            <p className="text-gray-300 text-sm mb-3">
              Au lendemain de l'ordre de deuil national
              décrété du Gouverneur militaire du
              Nord-Kivu, une réunion s'est...
            </p>
            <button className="lire-plus">Lire Plus...</button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3">
            <img 
              src="https://picsum.photos/seed/title/300/200" 
              alt="Article titre" 
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className="text-white font-bold mb-2">Ceci est le titre de l'article...</h3>
            <p className="text-gray-300 text-sm mb-3">{placeholderText}</p>
            <button className="lire-plus">Lire Plus...</button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <NewsCard 
            key={item}
            title="Ceci est le titre de l'article..."
            image="/lovable-uploads/68ee4a49-d59b-44f2-9f7c-480ffddf05a8.png"
            excerpt={placeholderText}
          />
        ))}
      </div>
    </section>
  );
};

export default ArticlesSection;

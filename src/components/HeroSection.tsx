
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-black overflow-hidden" style={{ minHeight: "300px" }}>
      <div className="container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="text-white animate-slideIn">
            <h1 className="text-mdh-gold text-xl md:text-2xl font-bold mb-4">
              RDC /Guerre M23 : Tshisekedi prêt à se sacrifier
            </h1>
            <p className="text-sm md:text-base mb-4">
              Les temps sont durs, les mesures exceptionnelles sont donc de mise. La 
              prise de Goma par les rebelles du M23 résonne comme un appel au
              patriotisme et au sacrifice. A voir les conclusions du conseil des ministres
              du vendredi dernier, Félix Tshisekedi est prêt à imposer des sacrifices
              importants aux institutions de la République Démocratique [...]
            </p>
            <button className="lire-plus">Lire Plus...</button>
          </div>
          <div className="animate-fadeIn">
            <img 
              src="https://picsum.photos/seed/president/600/400" 
              alt="Président Tshisekedi" 
              className="w-full h-auto shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
      <button className="slide-nav-button prev-button">
        <ChevronLeft />
      </button>
      <button className="slide-nav-button next-button">
        <ChevronRight />
      </button>
    </section>
  );
};

export default HeroSection;

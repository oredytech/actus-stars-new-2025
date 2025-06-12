
import React from 'react';
import { Phone, Home, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return <footer className="bg-black py-8 mb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">A propos</h3>
            <div className="mb-4">
              <div className="w-auto h-24 flex items-center justify-start mb-4">
                <img src="/lovable-uploads/cf35211d-2e57-4cee-a4b0-e78eea63693a.png" alt="Actu Stars" className="h-16" />
              </div>
              <p className="text-gray-400 text-sm">
                Actu Stars : Votre source ultime d'actualités diversifiées sur le sport, 
                politique, économie, buzz, divertissement, portrait, société et musique.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contacts</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2 text-mdh-gold" /> +243 818 878 850
              </li>
              <li className="flex items-center text-gray-400">
                <Home size={16} className="mr-2 text-mdh-gold" /> Goma, République Démocratique du Congo
              </li>
              <li className="flex items-start text-gray-400">
                <Home size={16} className="mr-2 text-mdh-gold mt-1 flex-shrink-0" /> 
                <span>Commune de GOMA référence HOPE CHANNEL TV</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2 text-mdh-gold" /> contact@actustars.net
              </li>
              <li className="flex space-x-4 mt-4">
                <a href="#" className="text-mdh-gold hover:text-white">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-mdh-gold hover:text-white">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-mdh-gold hover:text-white">
                  <Instagram size={20} />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Partenaires</h3>
            <div className="relative overflow-hidden">
              <div className="flex animate-[scroll_20s_linear_infinite] space-x-4">
                {[...Array(12)].map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-16 h-16 bg-gray-800 p-2 rounded flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/cf35211d-2e57-4cee-a4b0-e78eea63693a.png" 
                      alt="Partenaire" 
                      className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-500 text-xs">
          @ 2025 Tout droit réservé : <span className="text-mdh-gold">Actus Stars</span> | Fièrement conçu par <a href="https://www.oredytech.com" target="_blank" rel="noopener noreferrer" className="text-mdh-gold hover:underline">Oredy TECHNOLOGIES</a> (www.oredytech.com)
        </div>
      </div>
    </footer>;
};

export default Footer;

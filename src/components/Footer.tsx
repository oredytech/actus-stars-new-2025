
import React from 'react';
import { Phone, Home, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">A propos</h3>
            <div className="mb-4">
              <div className="w-24 h-24 bg-mdh-red rounded-sm flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">
                  MDH<span className="text-sm align-top">TV</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Praesentium, placeat neque necessitatibus neque quibusdam porro 
                magni explicabo! Similique qui earum accusamus 
                exercitationem ratione adipisci praesentium vel placeat.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contacts</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2 text-mdh-gold" /> +243 970 908 665
              </li>
              <li className="flex items-center text-gray-400">
                <Home size={16} className="mr-2 text-mdh-gold" /> +243 832 461 307
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2 text-mdh-gold" /> contact@mdhtv.com
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
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-mdh-red p-2 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">
                    MDH<span className="text-[8px] align-top">TV</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-500 text-xs">
          © 2023 Tout droit réservé : <span className="text-mdh-gold">MDH</span> | Fièrement conçu par <span className="text-mdh-gold">Gordy TECHNOLOGIES</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

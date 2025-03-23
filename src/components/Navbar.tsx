
import React from 'react';
import { Menu, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black py-3 px-4 flex justify-between items-center sticky top-0 z-50 border-b border-mdh-red/30">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-mdh-red rounded-sm flex items-center justify-center">
          <Link to="/" className="text-white font-bold text-xs">
            MDH<span className="text-[8px] align-top">TV</span>
          </Link>
        </div>
        <button className="ml-4 text-white">
          <Menu size={24} />
        </button>
      </div>
      
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="nav-link">Accueil</Link>
        <Link to="/about" className="nav-link">A propos de nous</Link>
        <Link to="/contacts" className="nav-link">Contacts</Link>
      </div>
      
      <div className="flex items-center">
        <button className="w-8 h-8 bg-mdh-gold rounded-full flex items-center justify-center">
          <Search size={16} className="text-black" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

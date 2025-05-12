
import React, { useState, useContext } from 'react';
import { Menu, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategorySidebar from './CategorySidebar';
import { CategoryContext } from '../App';

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { selectedCategoryId, setSelectedCategoryId } = useContext(CategoryContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId === 0 ? null : categoryId);
  };

  return (
    <>
      <nav className="bg-black py-3 px-4 flex justify-between items-center sticky top-0 z-50 border-b border-mdh-red/30">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-mdh-red rounded-sm flex items-center justify-center">
            <Link to="/" className="text-white font-bold text-xs">
              MDH<span className="text-[8px] align-top">TV</span>
            </Link>
          </div>
          <button 
            className="ml-4 text-white p-2 hover:bg-mdh-red/20 rounded-full transition-colors"
            onClick={toggleSidebar}
            aria-label="Menu"
          >
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

      <CategorySidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onCategorySelect={handleCategorySelect} 
      />

      {/* Overlay pour fermer la sidebar en cliquant à l'extérieur sur mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;

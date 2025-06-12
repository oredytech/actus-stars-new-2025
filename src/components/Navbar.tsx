
import React, { useState, useContext } from 'react';
import { Menu, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CategorySidebar from './CategorySidebar';
import { CategoryContext } from '../App';

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setSelectedCategoryId } = useContext(CategoryContext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <>
      <nav className="bg-black py-3 px-4 flex justify-between items-center sticky top-0 z-50 border-b border-mdh-red/30">
        <div className="flex items-center">
          <div className="h-12 flex items-center justify-center mr-4">
            <Link to="/" className="text-white font-bold">
              <img src="/lovable-uploads/cf35211d-2e57-4cee-a4b0-e78eea63693a.png" alt="Actu Stars" className="h-10" />
            </Link>
          </div>
          <button 
            className="text-white p-2 hover:bg-mdh-red/20 rounded-full transition-colors"
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
          <button 
            className="w-8 h-8 bg-mdh-gold rounded-full flex items-center justify-center hover:bg-mdh-gold/80 transition-colors"
            onClick={handleSearchClick}
            aria-label="Rechercher"
          >
            <Search size={16} className="text-black" />
          </button>
        </div>
      </nav>

      <CategorySidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  );
};

export default Navbar;

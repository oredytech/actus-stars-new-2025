
import React, { useState, useEffect, useContext } from 'react';
import { X, Facebook, Twitter, Instagram, Linkedin, Menu, Home, Mail, Info } from 'lucide-react';
import axios from 'axios';
import { CategoryContext } from '../App';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CategoryArticles from './CategoryArticles';
import { useIsMobile } from "@/hooks/use-mobile";

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedCategoryId, setSelectedCategoryId } = useContext(CategoryContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [showCategoryList, setShowCategoryList] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://actustars.net/wp-json/wp/v2/categories?per_page=50');
        
        // Filter categories with at least one post
        const filteredCategories = response.data.filter(
          (category: WordPressCategory) => category.count > 0
        );
        
        setCategories(filteredCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching WordPress categories:', error);
        setError('Impossible de charger les catégories');
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId === selectedCategoryId ? null : categoryId);
    
    // On mobile, hide the category list when a category is selected
    if (isMobile && categoryId !== selectedCategoryId) {
      setShowCategoryList(false);
    }
  };

  // Toggle back to category list view on mobile
  const showCategories = () => {
    setShowCategoryList(true);
  };

  // Si le sidebar n'est pas ouvert, ne pas le rendre
  if (!isOpen) return null;

  // Navigation items for the sidebar
  const navigationItems = [
    { title: 'Accueil', icon: Home, path: '/' },
    { title: 'A propos de nous', icon: Info, path: '/about' },
    { title: 'Contacts', icon: Mail, path: '/contacts' }
  ];

  return (
    <div className="fixed inset-0 z-40 flex">
      {/* Overlay pour fermer sur mobile */}
      <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden" onClick={onClose}></div>
      
      <div className="w-full flex relative z-10">
        {/* Partie gauche : liste des catégories */}
        <div 
          className={`${isMobile && !showCategoryList ? 'hidden' : 'w-full md:w-64'} 
            bg-mdh-dark border-r border-mdh-red/30 overflow-auto flex flex-col`}
        >
          <div className="p-4 flex items-center justify-between border-b border-mdh-red/20">
            <h2 className="text-lg font-bold text-mdh-gold">Catégories</h2>
            <button 
              onClick={onClose} 
              className="p-1 rounded-full hover:bg-mdh-red/10 text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="py-2 flex-grow">
            {loading ? (
              <div className="flex justify-center p-4">
                <span className="text-white">Chargement...</span>
              </div>
            ) : error ? (
              <div className="text-mdh-red p-4 text-center">{error}</div>
            ) : categories.length === 0 ? (
              <div className="text-gray-400 p-4 text-center">Aucune catégorie trouvée</div>
            ) : (
              <ul className="space-y-1">
                <li 
                  className={`px-4 py-2 cursor-pointer hover:bg-mdh-red/10 transition-colors ${
                    selectedCategoryId === null ? 'bg-mdh-red/20 text-mdh-gold' : 'text-white'
                  }`}
                  onClick={() => handleCategoryClick(0)}
                >
                  Toutes les catégories
                </li>
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className={`px-4 py-2 cursor-pointer hover:bg-mdh-red/10 transition-colors ${
                      selectedCategoryId === category.id ? 'bg-mdh-red/20 text-mdh-gold' : 'text-white'
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.name} ({category.count})
                  </li>
                ))}
              </ul>
            )}

            {/* Séparateur et liens de navigation pour mobile */}
            <div className="md:hidden mt-4">
              <div className="h-px bg-mdh-red/30 mx-4"></div>
              <div className="pt-2 pb-1 px-4">
                <h3 className="text-sm font-medium text-mdh-gold">Navigation</h3>
              </div>
              <ul className="space-y-1">
                {navigationItems.map((item) => (
                  <li key={item.title}>
                    <Link 
                      to={item.path}
                      className="flex items-center px-4 py-2 text-white hover:bg-mdh-red/10 transition-colors"
                      onClick={onClose}
                    >
                      <item.icon size={18} className="mr-2 text-mdh-gold" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Social Media Buttons */}
          <div className="mt-auto border-t border-mdh-red/20 p-4">
            <h3 className="text-sm font-medium text-white mb-3">Suivez-nous</h3>
            <div className="flex justify-around">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-mdh-dark hover:bg-mdh-red/20 text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-mdh-dark hover:bg-mdh-red/20 text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-mdh-dark hover:bg-mdh-red/20 text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-mdh-dark hover:bg-mdh-red/20 text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Partie droite : articles de la catégorie sélectionnée */}
        <div className={`${isMobile && showCategoryList ? 'hidden' : 'flex-1'} bg-mdh-dark overflow-auto`}>
          {/* Menu icon to show sidebar on mobile */}
          {isMobile && !showCategoryList && (
            <button
              onClick={showCategories}
              className="fixed top-20 left-4 z-50 p-3 bg-mdh-red/80 text-white rounded-full shadow-md"
              aria-label="Ouvrir les catégories"
            >
              <Menu size={20} />
            </button>
          )}
          
          {selectedCategoryId !== null && (
            <div className="p-4">
              {isMobile && (
                <button 
                  onClick={showCategories}
                  className="mb-4 px-3 py-1.5 bg-mdh-red/20 text-white rounded-md flex items-center"
                >
                  &larr; Retour aux catégories
                </button>
              )}
              <CategoryArticles categoryId={selectedCategoryId} />
            </div>
          )}
          {selectedCategoryId === null && (
            <div className="h-full flex items-center justify-center text-white">
              <p className="text-center">Sélectionnez une catégorie pour voir les articles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;

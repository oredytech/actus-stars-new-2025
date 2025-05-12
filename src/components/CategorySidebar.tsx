
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import axios from 'axios';

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect: (categoryId: number) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ isOpen, onClose, onCategorySelect }) => {
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

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
    setSelectedCategoryId(categoryId);
    onCategorySelect(categoryId);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-mdh-dark border-r border-mdh-red/30 transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } overflow-y-auto`}
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

      <div className="py-2">
        {loading ? (
          <div className="flex justify-center p-4">
            <span className="text-white">Chargement...</span>
          </div>
        ) : error ? (
          <div className="text-mdh-red p-4 text-center">{error}</div>
        ) : categories.length === 0 ? (
          <div className="text-gray-400 p-4 text-center">Aucune catégorie trouvée</div>
        ) : (
          <ul>
            <li 
              className={`px-4 py-2 cursor-pointer hover:bg-mdh-red/10 ${
                selectedCategoryId === null ? 'bg-mdh-red/20 text-mdh-gold' : 'text-white'
              }`}
              onClick={() => {
                setSelectedCategoryId(null);
                onCategorySelect(0); // 0 représente "toutes les catégories"
              }}
            >
              Toutes les catégories
            </li>
            {categories.map((category) => (
              <li
                key={category.id}
                className={`px-4 py-2 cursor-pointer hover:bg-mdh-red/10 ${
                  selectedCategoryId === category.id ? 'bg-mdh-red/20 text-mdh-gold' : 'text-white'
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name} ({category.count})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategorySidebar;

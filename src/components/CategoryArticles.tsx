
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WordPressArticle, getArticleImage, stripHtmlTags } from '../services/wordpressService';
import NewsCard from './NewsCard';
import SectionTitle from './SectionTitle';

interface CategoryArticlesProps {
  categoryId: number | null;
}

const CategoryArticles: React.FC<CategoryArticlesProps> = ({ categoryId }) => {
  const [articles, setArticles] = useState<WordPressArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string>("Tous les articles");

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        let endpoint = 'https://actustars.net/wp-json/wp/v2/posts?_embed&per_page=12';
        
        if (categoryId && categoryId > 0) {
          endpoint += `&categories=${categoryId}`;
          
          // Fetch category name
          const categoryResponse = await axios.get(`https://actustars.net/wp-json/wp/v2/categories/${categoryId}`);
          setCategoryName(categoryResponse.data.name);
        } else {
          setCategoryName("Tous les articles");
        }
        
        const response = await axios.get(endpoint);
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Impossible de charger les articles');
        setLoading(false);
      }
    };

    fetchArticles();
  }, [categoryId]);

  const truncateExcerpt = (excerpt: string): string => {
    const plainText = stripHtmlTags(excerpt);
    return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-white">Chargement des articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-mdh-red">{error}</div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="text-white">Aucun article trouvé dans cette catégorie</div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <SectionTitle title={categoryName} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <NewsCard
            key={article.id}
            id={article.id}
            title={article.title.rendered}
            image={getArticleImage(article)}
            excerpt={truncateExcerpt(article.excerpt.rendered)}
            category={article._embedded?.['wp:term']?.[0]?.[0]?.name}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryArticles;

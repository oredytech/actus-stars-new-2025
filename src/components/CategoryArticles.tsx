import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WordPressArticle, getArticleImage, stripHtmlTags } from '../services/wordpressService';
import NewsCard from './NewsCard';
import SectionTitle from './SectionTitle';
import LoadingSpinner from './LoadingSpinner';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CategoryArticlesProps {
  categoryId: number | null;
}

const CategoryArticles: React.FC<CategoryArticlesProps> = ({ categoryId }) => {
  const [articles, setArticles] = useState<WordPressArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string>("Tous les articles");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const articlesPerPage = 9;

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when category changes
  }, [categoryId]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        let endpoint = `https://actustars.net/wp-json/wp/v2/posts?_embed&per_page=${articlesPerPage}&page=${currentPage}`;
        
        if (categoryId && categoryId > 0) {
          endpoint += `&categories=${categoryId}`;
          
          // Fetch category name
          try {
            const categoryResponse = await axios.get(`https://actustars.net/wp-json/wp/v2/categories/${categoryId}`);
            setCategoryName(categoryResponse.data.name);
          } catch (catError) {
            console.error('Error fetching category name:', catError);
            setCategoryName(`Catégorie ${categoryId}`);
          }
        } else {
          setCategoryName("Tous les articles");
        }
        
        const response = await axios.get(endpoint);
        setArticles(response.data);
        
        // Get total pages from response headers
        const totalPagesHeader = response.headers['x-wp-totalpages'];
        setTotalPages(parseInt(totalPagesHeader) || 1);
        
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Impossible de charger les articles. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [categoryId, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const truncateExcerpt = (excerpt: string): string => {
    const plainText = stripHtmlTags(excerpt);
    return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[300px] text-center">
        <div className="text-mdh-red mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="lire-plus"
        >
          Réessayer
        </button>
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

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
              className="text-white hover:bg-mdh-red/20 hover:text-mdh-gold"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show pages with ellipsis for larger totals
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={currentPage === 1}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
            className="text-white hover:bg-mdh-red/20 hover:text-mdh-gold"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Add ellipsis if needed
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis className="text-white" />
          </PaginationItem>
        );
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
              className="text-white hover:bg-mdh-red/20 hover:text-mdh-gold"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Add ellipsis if needed
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis className="text-white" />
          </PaginationItem>
        );
      }

      // Always show last page
      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              isActive={currentPage === totalPages}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(totalPages);
              }}
              className="text-white hover:bg-mdh-red/20 hover:text-mdh-gold"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <div className="py-4 animate-fadeIn">
      <SectionTitle title={categoryName} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                className={`text-white hover:bg-mdh-red/20 hover:text-mdh-gold ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </PaginationItem>
            
            {generatePaginationItems()}
            
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) handlePageChange(currentPage + 1);
                }}
                className={`text-white hover:bg-mdh-red/20 hover:text-mdh-gold ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default CategoryArticles;

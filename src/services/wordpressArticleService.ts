
import axios from 'axios';
import { WordPressArticle } from '../types/wordpress';

export const fetchLatestArticles = async (count: number = 5): Promise<WordPressArticle[]> => {
  try {
    const response = await axios.get(
      `https://actustars.net/wp-json/wp/v2/posts?_embed&per_page=${count}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching WordPress articles:', error);
    return [];
  }
};

export const fetchArticleBySlug = async (slug: string): Promise<WordPressArticle | null> => {
  try {
    // Nettoyer le slug - enlever les caractères spéciaux et limiter la longueur
    const cleanSlug = slug.replace(/^\/+|\/+$/g, '').substring(0, 200);
    
    const response = await axios.get(
      `https://actustars.net/wp-json/wp/v2/posts?_embed&slug=${encodeURIComponent(cleanSlug)}`,
      {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
        }
      }
    );
    
    // Vérifier que la réponse est bien un array
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
};

export const fetchArticleById = async (id: number): Promise<WordPressArticle | null> => {
  try {
    const response = await axios.get(
      `https://actustars.net/wp-json/wp/v2/posts/${id}?_embed`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    return null;
  }
};

export const searchArticles = async (query: string): Promise<WordPressArticle[]> => {
  try {
    const response = await axios.get(
      `https://actustars.net/wp-json/wp/v2/posts?_embed&search=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error('Error searching WordPress articles:', error);
    return [];
  }
};

export const fetchSimilarArticles = async (categoryIds: number[], excludeId: number, count: number = 4): Promise<WordPressArticle[]> => {
  if (categoryIds.length === 0) return [];
  
  try {
    const params = new URLSearchParams({
      _embed: '',
      per_page: count.toString(),
      exclude: excludeId.toString(),
      categories: categoryIds.join(',')
    });
    
    const response = await axios.get(
      `https://actustars.net/wp-json/wp/v2/posts?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching similar articles:', error);
    return [];
  }
};

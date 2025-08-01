
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
    const response = await axios.get(
      `https://actustars.net/wp-json/wp/v2/posts?_embed&slug=${slug}`
    );
    return response.data[0] || null;
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

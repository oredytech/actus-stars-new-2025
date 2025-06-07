
import axios from 'axios';
import { WordPressComment } from '../types/wordpress';

export const fetchComments = async (postId: number, perPage: number = 3): Promise<WordPressComment[]> => {
  try {
    const response = await axios.get(
      `https://actustars.net/wp-json/wp/v2/comments?post=${postId}&per_page=${perPage}&orderby=date&order=desc&status=approved`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
};

export const submitComment = async (postId: number, name: string, email: string, content: string): Promise<boolean> => {
  try {
    const response = await axios.post('https://actustars.net/wp-json/wp/v2/comments', {
      post: postId,
      author_name: name,
      author_email: email,
      content,
    });
    return !!response.data.id;
  } catch (error) {
    console.error('Error submitting comment:', error);
    return false;
  }
};

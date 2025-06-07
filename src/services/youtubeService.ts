
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  videoId: string;
}

const YOUTUBE_API_KEY = 'AIzaSyAvPCvhZvtBixpgsIdwh1jOtD49FeTs-6U';
const CHANNEL_ID = 'UCPmawwmq9G8mCP2e1C9uw3A';

export const fetchLatestYouTubeVideos = async (maxResults: number = 3): Promise<YouTubeVideo[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`
    );
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      videoId: item.id.videoId,
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};

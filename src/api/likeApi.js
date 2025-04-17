import axiosInstance from './axiosInstance';

// Toggle like for a video
export const toggleVideoLike = async (videoId) => {
  try {
    const response = await axiosInstance.post(`/like/toggle/v/${videoId}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to toggle video like');
  }
};

// Toggle like for a comment
export const toggleCommentLike = async (commentId) => {
  try {
    const response = await axiosInstance.post(`/like/toggle/c/${commentId}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to toggle comment like');
  }
};

// Toggle like for a tweet
export const toggleTweetLike = async (tweetId) => {
  try {
    const response = await axiosInstance.post(`/like/toggle/t/${tweetId}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to toggle tweet like');
  }
};

// Fetch all liked videos
export const fetchLikedVideos = async () => {
  try {
    const response = await axiosInstance.get('/like/videos');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch liked videos');
  }
};

// Fetch all likes for a specific video
export const fetchVideoLikes = async (videoId) => {
  try {
    const response = await axiosInstance.get(`/like/v/${videoId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch video likes');
  }
};
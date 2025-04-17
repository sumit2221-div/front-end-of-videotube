import axiosInstance from './axiosInstance';

// Fetch comments for a video
export const fetchVideoComments = async (videoId) => {
  try {
    const response = await axiosInstance.get(`/comment/v/${videoId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch video comments');
  }
};

// Add a comment to a video
export const addVideoComment = async (videoId, content) => {
  try {
    const response = await axiosInstance.post(`/comment/v/${videoId}`, { content });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add video comment');
  }
};

// Delete a comment
export const deleteComment = async (commentId) => {
  try {
    const response = await axiosInstance.delete(`/comment/c/${commentId}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete comment');
  }
};

// Update a comment
export const updateComment = async (commentId, content) => {
  try {
    const response = await axiosInstance.patch(`/comment/c/${commentId}`, { content });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update comment');
  }
};

// Fetch comments for a tweet
export const fetchTweetComments = async (tweetId) => {
  try {
    const response = await axiosInstance.get(`/comment/t/${tweetId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tweet comments');
  }
};

// Add a comment to a tweet
export const addTweetComment = async (tweetId, content) => {
  try {
    const response = await axiosInstance.post(`/comment/t/${tweetId}`, { content });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add tweet comment');
  }
};
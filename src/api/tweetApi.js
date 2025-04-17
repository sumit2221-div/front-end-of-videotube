import axiosInstance from './axiosInstance';

// Fetch all tweets
export const fetchAllTweets = async () => {
  try {
    const response = await axiosInstance.get('/tweet');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tweets');
  }
};

// Fetch tweets by a specific user
export const fetchUserTweets = async (userId) => {
  try {
    const response = await axiosInstance.get(`/tweet/user/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user tweets');
  }
};

// Create a new tweet
export const createTweet = async (formData) => {
  try {
    const response = await axiosInstance.post('/tweet', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create tweet');
  }
};

// Update a tweet
export const updateTweet = async (tweetId, data) => {
  try {
    const response = await axiosInstance.patch(`/tweet/${tweetId}`, data);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update tweet');
  }
};

// Delete a tweet
export const deleteTweet = async (tweetId) => {
  try {
    const response = await axiosInstance.delete(`/tweet/${tweetId}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete tweet');
  }
};
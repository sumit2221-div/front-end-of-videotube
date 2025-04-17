import axiosInstance from './axiosInstance';

// Fetch all videos
export const fetchAllVideos = async (params) => {
  try {
    const response = await axiosInstance.get('/video', { params });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch videos');
  }
};

// Publish a new video
export const publishVideo = async (formData) => {
  try {
    const response = await axiosInstance.post('/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to publish video');
  }
};

// Fetch a video by ID
export const fetchVideoById = async (videoId) => {
  try {
    const response = await axiosInstance.get(`/video/${videoId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch video');
  }
};

// Update a video
export const updateVideo = async (videoId, formData) => {
  try {
    const response = await axiosInstance.patch(`/video/${videoId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update video');
  }
};

// Delete a video
export const deleteVideo = async (videoId) => {
  try {
    const response = await axiosInstance.delete(`/video/${videoId}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete video');
  }
};

// Toggle publish status of a video
export const togglePublishStatus = async (videoId) => {
  try {
    const response = await axiosInstance.patch(`/video/toggle/publish/${videoId}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to toggle publish status');
  }
};

// Fetch videos from subscribed channels
export const fetchSubscriberVideos = async () => {
  try {
    const response = await axiosInstance.get('/video/v/subscriber');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch subscriber videos');
  }
};
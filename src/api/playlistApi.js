import axiosInstance from './axiosInstance';

// Create a new playlist
export const createPlaylist = async (data) => {
  try {
    const response = await axiosInstance.post('/playlist', data);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create playlist');
  }
};

// Fetch playlists of a specific user
export const fetchUserPlaylists = async (userId) => {
  try {
    const response = await axiosInstance.get(`/playlist/user/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user playlists');
  }
};

// Fetch a playlist by ID
export const fetchPlaylistById = async (playlistId) => {
  try {
    const response = await axiosInstance.get(`/playlist/${playlistId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch playlist');
  }
};

// Update a playlist
export const updatePlaylist = async (playlistId, data) => {
  try {
    const response = await axiosInstance.patch(`/playlist/${playlistId}`, data);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update playlist');
  }
};

// Delete a playlist
export const deletePlaylist = async (playlistId) => {
  try {
    const response = await axiosInstance.delete(`/playlist/${playlistId}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete playlist');
  }
};

// Add a video to a playlist
export const addVideoToPlaylist = async (videoId, playlistId) => {
  try {
    const response = await axiosInstance.patch(`/playlist/add/${videoId}/${playlistId}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add video to playlist');
  }
};

// Remove a video from a playlist
export const removeVideoFromPlaylist = async (videoId, playlistId) => {
  try {
    const response = await axiosInstance.patch(`/playlist/remove/${videoId}/${playlistId}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to remove video from playlist');
  }
};
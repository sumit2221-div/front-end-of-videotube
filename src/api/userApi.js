import axiosInstance from './axiosInstance';

// Register a new user
export const registerUser = (formData) => {
  return axiosInstance.post('/users/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Login user
export const loginUser = (data) => {
  return axiosInstance.post('/users/login', data);
};

// Logout user
export const logoutUser = () => {
  return axiosInstance.post('/users/logout');
};

// Refresh access token
export const refreshAccessToken = () => {
  return axiosInstance.post('/users/refresh-token');
};

// Change current password
export const changePassword = (data) => {
  return axiosInstance.post('/users/change-password', data);
};

// Get current user details
export const getCurrentUser = () => {
  return axiosInstance.get('/users/current-user');
};

// Update account details
export const updateAccountDetails = (data) => {
  return axiosInstance.patch('/users/update-account', data);
};

// Update user avatar
export const updateUserAvatar = (formData) => {
  return axiosInstance.patch('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Update user cover image
export const updateUserCoverImage = (formData) => {
  return axiosInstance.patch('/users/coverImage', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Get user by ID
export const getUserById = (userId) => {
  return axiosInstance.get(`/users/${userId}`);
};

// Get user channel profile
export const getUserChannelProfile = (userId) => {
  return axiosInstance.get(`/users/c/${userId}`);
};


import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://backend-of-videotube.onrender.com/api/v1', // Base URL for all API requests
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Allow credentials (cookies) to be sent with requests
});

// Add an interceptor to include the access token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
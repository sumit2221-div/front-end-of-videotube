import axiosInstance from './axiosInstance';

// Toggle subscription for a channel
export const toggleSubscription = async (channelId) => {
  try {
    const response = await axiosInstance.post(`/subscription/c/${channelId}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to toggle subscription');
  }
};

// Fetch subscribers of a channel
export const fetchChannelSubscribers = async (channelId) => {
  try {
    const response = await axiosInstance.get(`/subscription/c/${channelId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch channel subscribers');
  }
};

// Fetch channels subscribed by a user
export const fetchSubscribedChannels = async (subscriberId) => {
  try {
    const response = await axiosInstance.get(`/subscription/u/${subscriberId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch subscribed channels');
  }
};
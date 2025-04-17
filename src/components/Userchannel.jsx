import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { getUserChannelProfile } from '../api/userApi'; // Import API for fetching channel data
import { fetchSubscriberVideos, deleteVideo } from '../api/videoApi'; // Import video-related APIs

function UserChannelPage() {
  const [channelData, setChannelData] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [deletingVideoId, setDeletingVideoId] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const data = await getUserChannelProfile(userId); // Fetch channel data using API
        setChannelData(data);
      } catch (error) {
        console.error('Error fetching user channel data:', error);
      }
    };

    const fetchUserVideos = async () => {
      try {
        const videos = await fetchSubscriberVideos(); // Fetch videos using API
        setUserVideos(videos);
      } catch (error) {
        console.error('Error fetching user videos:', error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchChannelData(), fetchUserVideos()]);
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  const handleDelete = async (videoId) => {
    try {
      setDeletingVideoId(videoId);
      await deleteVideo(videoId); // Delete video using API
      setUserVideos(userVideos.filter((video) => video._id !== videoId));
    } catch (error) {
      console.error('Error deleting video:', error);
    } finally {
      setDeletingVideoId(null);
    }
  };

  if (loading) {
    return (
      <div className="w-full mx-10">
        <div className="flex w-auto gap-5 bg-transparent animate-fadeIn">
          <div className="h-[200px] w-[200px] relative top-5 left-5 animate-pulse bg-gray-600 rounded-full"></div>
          <div className="relative gap-5 flex flex-col h-[300px] mt-8">
            <div className="w-3/4 h-12 mb-4 bg-gray-600 animate-pulse"></div>
            <div className="flex gap-5">
              <div className="animate-pulse bg-gray-600 h-8 w-[150px]"></div>
              <div className="animate-pulse bg-gray-600 h-8 w-[150px]"></div>
            </div>
            <div className="w-2/3 h-8 mt-auto bg-gray-600 animate-pulse"></div>
          </div>
        </div>
        <div className="w-full mx-20">
          <h2 className="mb-4 text-2xl font-semibold text-white">Videos</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userVideos.map((video, index) => (
              <div key={index} className="overflow-hidden bg-gray-800 rounded-lg">
                <div className="h-48 bg-gray-600 animate-pulse"></div>
                <div className="p-4">
                  <div className="w-3/4 h-6 mb-2 bg-gray-600 animate-pulse"></div>
                  <div className="w-1/2 h-4 bg-gray-600 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-10">
      <div className="flex w-auto gap-5 bg-transparent animate-fadeIn">
        <img src={channelData.avatar} className="h-[200px] w-[200px] rounded-full relative top-5 left-5" alt={channelData.fullName} />
        <div className="relative gap-5 flex flex-col h-[300px] mt-8">
          <h1 className="font-serif text-5xl text-white">{channelData.fullName}</h1>
          <h3 className="text-xl text-white">
            {channelData.username} <span className="text-white">Video: {channelData.uploadedVideosCount}</span>
          </h3>
          <div className="flex gap-5">
            <button className="text-white h-[40px] w-[150px] bg-gray-800 rounded-xl">Update Details</button>
            <button className="h-[40px] w-[150px] bg-gray-800 rounded-xl text-white">Create Playlist</button>
          </div>
          <h3 className="text-xl text-white">Subscribers: {channelData.subscribersCount}</h3>
        </div>
      </div>
      <div className="w-full mx-10">
        <h2 className="mb-4 text-2xl font-semibold text-white">Videos</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userVideos.map((video) => (
            <div key={video._id} className="relative overflow-hidden bg-transparent shadow-xl rounded-lg w-[450px]">
              <img src={video.thumbnail} alt={video.title} className="object-cover w-full h-48" />
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                  <p className="text-gray-400">{video.views} views</p>
                </div>
                <button
                  className="text-white"
                  onClick={() => handleDelete(video._id)}
                  disabled={deletingVideoId === video._id}
                >
                  {deletingVideoId === video._id ? <FaSpinner className="animate-spin" /> : <MdDelete size={24} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserChannelPage;

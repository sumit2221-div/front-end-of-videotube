import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';

function UserChannelPage() {
  const [channelData, setChannelData] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [deletingVideoId, setDeletingVideoId] = useState(null);

  // Spring animation for loading state
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const accessToken = sessionStorage.getItem('accessToken');
        const response = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/users/c/${userId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setChannelData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user channel data:', error);
      }
    };

    const fetchUserVideos = async () => {
      try {
        const accessToken = sessionStorage.getItem('accessToken');
        const response = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/video/v/subscriber`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setUserVideos(response.data.data);
      } catch (error) {
        console.error('Error fetching user videos:', error);
      }
    };

    fetchChannelData();
    fetchUserVideos();
  }, [userId]);

  const handleDelete = async (videoId) => {
    try {
      setDeletingVideoId(videoId);
      const accessToken = sessionStorage.getItem('accessToken');
      await axios.delete(`https://backend-of-videotube.onrender.com/api/v1/video/${videoId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setUserVideos(userVideos.filter(video => video._id !== videoId));
    } catch (error) {
      console.error('Error deleting video:', error);
    } finally {
      setDeletingVideoId(null);
    }
  };

  if (!channelData || loading) {
    return (
      <div className="w-full mx-10">
        <animated.div style={fadeIn} className="flex w-auto gap-5 bg-transparent">
          <div className="h-[200px] w-[200px] relative top-5 left-5 animate-pulse bg-gray-600 rounded-full"></div>
          <div className="relative gap-5 flex flex-col h-[300px] mt-8">
            <div className="w-3/4 h-12 mb-4 bg-gray-600 animate-pulse"></div>
            <div className="flex gap-5">
              <div className="animate-pulse bg-gray-600 h-8 w-[150px]"></div>
              <div className="animate-pulse bg-gray-600 h-8 w-[150px]"></div>
            </div>
            <div className="w-2/3 h-8 mt-auto bg-gray-600 animate-pulse"></div>
          </div>
        </animated.div>
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
      <animated.div style={fadeIn} className="flex w-auto gap-5 bg-transparent">
        <img src={channelData.avatar} className="h-[200px] w-[200px] rounded-full relative top-5 left-5" alt={channelData.fullName} />
        <div className="relative gap-5 flex flex-col h-[300px] mt-8">
          <h1 className="font-serif text-5xl text-white">{channelData.fullName}</h1>
          <h3 className="text-xl text-white">
            {channelData.username} <span className="text-white">Video: {channelData.uploadedVideosCount}</span>
          </h3>
          <div className="flex gap-5">
            <button className="text-white h-[40px] w-[150px] bg-gray-800 rounded-xl">update detail</button>
            <button className="h-[40px] w-[150px] bg-gray-800 rounded-xl text-white">create playlist</button>
          </div>
          <h3 className="text-xl text-white">subscriber {channelData.subscribersCount}</h3>
        </div>
      </animated.div>
      <div className="w-full mx-10">
        <h2 className="mb-4 text-2xl font-semibold text-white">Videos</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userVideos.map(video => (
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

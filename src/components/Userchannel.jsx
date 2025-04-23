import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { getUserChannelProfile } from '../api/userApi'; // Import API for fetching channel data
import { deleteVideo } from '../api/videoApi'; // Import video-related APIs

function UserChannelPage() {
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingVideoId, setDeletingVideoId] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const data = await getUserChannelProfile(userId);
        setChannelData(data.data.data);
        console.log('Channel Data:', data.data.data);
      } catch (error) {
        console.error('Error fetching user channel data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [userId]);

  const handleDelete = async (videoId) => {
    try {
      setDeletingVideoId(videoId);
      await deleteVideo(videoId); // Delete video using API
      setChannelData((prevData) => ({
        ...prevData,
        uploadedVideos: prevData.uploadedVideos.filter((video) => video._id !== videoId),
      }));
    } catch (error) {
      console.error('Error deleting video:', error);
    } finally {
      setDeletingVideoId(null);
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (!channelData) {
    return <div className="text-center text-white">No data available</div>;
  }

  return (
    <div className="w-full mx-10">
      {/* Channel Details */}
      <div className="flex w-auto gap-5 bg-transparent animate-fadeIn">
        <img
          src={channelData.user.avatar}
          className="h-[200px] w-[200px] rounded-full relative top-5 left-5"
          alt={channelData.user.fullName}
        />
        <div className="relative gap-5 flex flex-col h-[300px] mt-8">
          <h1 className="font-serif text-5xl text-white">{channelData.user.fullName}</h1>
          <h3 className="text-xl text-white">
            {channelData.user.username} <span className="text-white">Videos: {channelData.uploadedVideos.length}</span>
          </h3>
          <h3 className="text-xl text-white">Subscribers: {channelData.subscribers.length}</h3>
          <h3 className="text-xl text-white">Subscriptions: {channelData.subscriptions.length}</h3>
        </div>
      </div>

      {/* Uploaded Videos */}
      <div className="w-full mx-10">
        <h2 className="mb-4 text-2xl font-semibold text-white">Uploaded Videos</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channelData.uploadedVideos.map((video) => (
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

      {/* Subscribers */}
      <div className="w-full mx-10">
        <h2 className="mb-4 text-2xl font-semibold text-white">Subscribers</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channelData.subscribers.map((subscriber) => (
            <div key={subscriber._id} className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
              <img
                src={subscriber.avatar}
                alt={subscriber.username}
                className="object-cover w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{subscriber.username}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscriptions */}
      <div className="w-full mx-10">
        <h2 className="mb-4 text-2xl font-semibold text-white">Subscriptions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channelData.subscriptions.map((subscription) => (
            <div key={subscription._id} className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
              <img
                src={subscription.avatar}
                alt={subscription.username}
                className="object-cover w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{subscription.username}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserChannelPage;

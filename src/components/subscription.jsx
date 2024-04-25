import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../components/videocard';
import { Link } from 'react-router-dom';

const SubscriptionVideos = () => {
  const [subscriptionVideos, setSubscriptionVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptionVideos = async () => {
      try {
        const accessToken = sessionStorage.getItem('accessToken');
        const response = await axios.get('https://backend-of-videotube.onrender.com/api/v1/video/v/subscriber', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        // Fetch owner data for each video
        const videosWithOwnerData = await Promise.all(response.data.data.map(async (video) => {
          try {
            const ownerResponse = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/users/${video.owner}`, {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            });
            const ownerData = ownerResponse.data.data;
            return { ...video, owner: ownerData };
          } catch (error) {
            console.error(`Error fetching owner data for video ${video._id}:`, error);
            return video;
          }
        }));

        setSubscriptionVideos(videosWithOwnerData);
      } catch (error) {
        console.error('Error fetching subscription videos:', error);
        setError('Failed to fetch subscription videos. Please try again later.');
      }
    };

    fetchSubscriptionVideos();
  }, []);
  const getTimeDifference = (createdAt) => {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const difference = now - createdAtDate;
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
  };



  if (error) {
    return <div>{error}</div>; // Render error message if there's an error
  }
  
  // Get the time difference in human-readable format
  const timeDifference = getTimeDifference(subscriptionVideos.createdAt);

  return (
    <div className="container w-full h-full mx-16">
      <h2 className="mb-4 text-2xl font-bold text-white">Subscription Videos</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subscriptionVideos.map(video => (
          <Link to={`video/${video._id}`}>
          <div className=" bg-transparent rounded-lg  w-[400px] flex flex-wrap">
            <img className="object-cover object-center w-full h-[200px] rounded-xl" src={video.thumbnail} alt={video.title} />
            <div className="w-full p-4 text-white bg-transparent  h-[90px]">
              <img className="h-[50px] w-[50px] rounded-full" src={video.owner.avatar} alt={video.owner.username} />
              <div className='relative flex flex-col flex-wrap mx-16 bottom-16'>
                <h4>{video.title}</h4>
                <h3>{video.owner.username}</h3>
                
                <h3>{timeDifference}</h3> {/* Display the time difference */}
              </div>
            </div>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionVideos;

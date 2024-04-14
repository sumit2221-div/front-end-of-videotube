import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  // Function to calculate the time difference
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

  // Get the time difference in human-readable format
  const timeDifference = getTimeDifference(video.createdAt);

  return (
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
  );
};

export default VideoCard;

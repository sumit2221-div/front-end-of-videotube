import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const getTimeDifference = (createdAt) => {
    if (!createdAt) return 'Unknown date';
    
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    if (isNaN(createdAtDate)) return 'Invalid date';
    
    const difference = now - createdAtDate;
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
    if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
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

  const timeDifference = getTimeDifference(video.createdAt);

  return (
    <Link to={`/video/${video._id}`}>
      <div className="bg-transparent rounded-lg w-[400px] flex flex-wrap transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img
          className="object-cover object-center w-full h-[200px] rounded-xl"
          src={video.thumbnail}
          alt={video.title}
        />
        <div className="w-full p-4 text-white bg-transparent h-[90px] flex items-center">
          <img
            className="h-[50px] w-[50px] rounded-full"
            src={video.owner.avatar}
            alt={`Avatar of ${video.owner.username}`}
          />
          <div className='flex flex-col ml-4'>
            <h4 className="text-lg font-semibold">{video.title}</h4>
            <h3 className="text-sm text-gray-400">{video.owner.username}</h3>
            <h4 className="text-sm text-gray-400">{timeDifference}</h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;

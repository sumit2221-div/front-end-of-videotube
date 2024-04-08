// VideoPlayer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
  const [video, setVideo] = useState(null);
  const { id } = useParams();
  const [owner, setOwner] = useState(null);

  console.log('ID:', id); // Log the value of id to see if it's undefined

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:4000/api/v1/video/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setVideo(response.data.data);
        const ownerResponse = await axios.get(`http://localhost:4000/api/v1/users/${response.data.data.owner}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setOwner(ownerResponse.data.data);
        console.log(ownerResponse.data);
        console.log(response.data.data.owner)
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, [id]);

  if (!video || !owner) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col w-full h-auto gap-5 mx-12 mt-12 rounded-xl'>
      <video className='h-[500px] w-[900px] rounded-2xl  relative top-4 left-8  bg-gray-600 object-cover' controls>
        <source src={video.videofile} />
        Your browser does not support the video tag.
      </video>
      <div className='h-[100px] w-[900px] bg-transparent relative left-8 rounded-xl'>
        <h1 className='text-2xl text-white'>{video.title}</h1>
        {owner && (
          <React.Fragment>
            <div className='flex gap-2'>
           
            <img className='h-[40px] w-[40px] rounded-full' src={owner.avatar} alt={owner.username} />
            <h1 className='text-white'>{owner.username}</h1>
            <button className=''></button>
            <button></button>
            <button></button>
            <button></button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;

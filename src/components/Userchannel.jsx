import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserChannelPage() {
  const [channelData, setChannelData] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const accessToken = sessionStorage.getItem('accessToken');
        const response = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/users/c/${username}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setChannelData(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user channel data:', error);
      }
    };

    fetchChannelData();
  }, [username]);

  if (!channelData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full h-auto mx-10 mt-10 bg-transparent ring-4'>
      <img src={channelData.avatar} className='h-[200px] w-[200px] rounded-full relative top-5 left-5' alt={channelData.fullName} />
      <h1 className='absolute font-serif text-5xl text-white left-[20%] top-[10%]'>{channelData.fullName}</h1>
      <div className='flex flex-row relative left-[18%] gap-4 bottom-24 '>
        <h3 className='text-xl text-white '>{channelData.username}</h3>
        <span className='text-white '>Video:{channelData.uploadedVideosCount}</span>
      </div>
      <div className='relative flex gap-5 left-56 bottom-20'>
        <button className=' text-white h-[40px] w-[150px] bg-gray-800 rounded-xl'>update detail</button>
        <button className='h-[40px] w-[150px] bg-gray-800 rounded-xl text-white'>create playlist</button>
      </div>

      
    </div>
  );
}

export default UserChannelPage;

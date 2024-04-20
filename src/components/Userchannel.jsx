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
    <div className='flex w-auto h-lvh '>
    
      
    <div className='w-auto mx-10 bg-transparent  '>
      <img src={channelData.avatar} className='h-[200px] w-[200px] rounded-full relative top-5 left-5' alt={channelData.fullName} />
    
      
      </div>
      <div className='relative gap-5 flex flex-col  h-[300px] '>
      <h1 className='font-serif text-5xl text-white '>{channelData.fullName}</h1>
    
      <h3 className='text-xl text-white'>
  {channelData.username} <span className='text-white'>Video: {channelData.uploadedVideosCount}</span>
</h3>
<div  className='flex gap-5'>

      
        <button className=' text-white h-[40px] w-[150px] bg-gray-800 rounded-xl'>update detail</button>
        <button className='h-[40px] w-[150px] bg-gray-800 rounded-xl text-white'>create playlist</button>
        </div>
        <h3 className='text-xl text-white'>subscriber {channelData.subscribersCount}</h3>


      </div>
      

    


      
    </div>
  
  );
}

export default UserChannelPage;

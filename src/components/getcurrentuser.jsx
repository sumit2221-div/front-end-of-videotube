import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    // Function to fetch current user data
    const fetchUserData = async () => {
      try {
        // Make a GET request to the backend endpoint to fetch current user data
        
        const response = await axios.get('https://backend-of-videotube.onrender.com/api/v1/users/current-user', {
        
         headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // Set the fetched user data in the state
        setUserData(response.data.data);
        console.log(response.data)
        setLoading(false);
  // Set loading state to false
      } catch (error) {
        // Handle error if request fails
        setError(error);
        setLoading(false); // Set loading state to false
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, []); // Empty dependency array to run the effect only once after the component mounts

  // Display loading message while data is being fetched
  if (loading) {
    return <div className="text-2xl text-center text-white">Loading...</div>;
  }

  // Display error message if request fails
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Display user data if available
  return (
    <div>
      {userData && (
        
        
          
          <img  className='h-[50px] w-[50px] rounded-full' src={userData.avatar}/>
          
        
      )}
    </div>
  );
}

export default Profile;

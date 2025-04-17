import React, { useState, useEffect } from 'react';
import { fetchCurrentUser } from '../api/userApi'; // Import the centralized API function

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch current user data
    const fetchUserData = async () => {
      try {
        // Use the centralized API function to fetch current user data
        const data = await fetchCurrentUser();
        setUserData(data); // Set the fetched user data in the state
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message || 'Failed to fetch user data.');
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run the effect only once after the component mounts

  // Display loading message while data is being fetched
  if (loading) {
    return <div className="text-2xl text-center text-white">Loading...</div>;
  }

  // Display error message if request fails
  if (error) {
    return <div className="text-2xl text-center text-red-500">Error: {error}</div>;
  }

  // Display user data if available
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      {userData && (
        <>
          <img
            className="h-[100px] w-[100px] rounded-full mb-4"
            src={userData.avatar || 'default-avatar.png'}
            alt="User Avatar"
          />
          <h1 className="text-xl font-bold text-white">{userData.fullName}</h1>
          <p className="text-sm text-gray-400">@{userData.username}</p>
          <p className="text-sm text-gray-400">{userData.email}</p>
        </>
      )}
    </div>
  );
}

export default Profile;

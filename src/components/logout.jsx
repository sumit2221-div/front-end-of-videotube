import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../store/authslice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        'https://backend-of-videotube.onrender.com/api/v1/users/logout',
        null, // No data payload
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      // Dispatch logout action
      dispatch(logout());

      // Remove access token from local storage
      localStorage.removeItem('accessToken');

      if (response.status === 200) {
        // Redirect to login page
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button className="text-white" onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;

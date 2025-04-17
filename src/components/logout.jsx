import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/userApi'; // Import the centralized API function
import { logout } from '../store/authslice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the centralized API function to log out
      await logoutUser();

      // Dispatch logout action
      dispatch(logout());

      // Remove access token from session storage
      sessionStorage.removeItem('accessToken');

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;

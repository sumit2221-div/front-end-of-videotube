import React, { useState } from 'react';
import { loginUser } from '../api/userApi'; // Import the login API function
import { login as authLogin } from '../store/authslice';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state
    setLoading(true); // Set loading state to true

    try {
      // Basic validation
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      // Use the centralized API service for login
      const response = await loginUser({ email, password });
      console.log(response.data);

      if (response) {
        // Store accessToken and refreshToken in sessionStorage
        const accessToken = response.data.data.accessToken;
        const refreshToken = response.data.data.refreshToken;

        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);

        // Check if the accessToken is stored successfully
        if (!sessionStorage.getItem('accessToken')) {
          throw new Error('Failed to store access token. Please try again.');
        }

        // Dispatch login action to Redux store
        dispatch(authLogin({ email, password }));

        // Navigate to the home page
        navigate('/');
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error(error);
      // Check if the error has a response and a message
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Set error from backend response
      } else {
        setError(error.message || 'An error occurred'); // Set generic error message
      }
    } finally {
      setLoading(false); // Set loading state to false after login attempt is finished
    }
  };

  return (
    <form className='px-8 pt-6 pb-8 mx-auto mt-20 mb-4 bg-gray-300 shadow-md w-80 rounded-xl' onSubmit={handleSubmit}>
      <h1 className='mb-5 text-2xl font-bold text-center text-gray-800'>Login</h1>

      {error && <p className="mb-5 text-center text-red-500">{error}</p>}

      <input
        className="block w-full px-4 py-2 mb-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="block w-full px-4 py-2 mb-6 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        type="submit"
        disabled={loading} // Disable the button while loading
      >
        {loading ? 'Logging in...' : 'Log In'} {/* Display different text based on loading state */}
      </button>

      <p className="mt-4 text-center text-gray-600">
        <Link to="/forgot-password" className="font-medium hover:underline">Forgot your password?</Link>
      </p>

      <p className="mt-2 text-base text-center text-gray-600">
        New user? <Link to="/registration" className="font-medium hover:underline">Sign up here</Link>
      </p>
    </form>
  );
};

export default Login;

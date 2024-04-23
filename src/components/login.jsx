import React, { useState } from 'react';
import axios from 'axios';
import { login as authLogin } from '../store/authslice';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

      const response = await axios.post('https://backend-of-videotube.onrender.com/api/v1/users/login', {
        email,
        password,
      });
      const { accessToken } = response.data.data;
      sessionStorage.setItem('accessToken', accessToken);

      dispatch(authLogin({ email, password }));

      if (response.data) {
        console.log(response.data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || 'An error occurred'); // Update error state with appropriate message
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };

  return (
    <form className='px-8 pt-6 pb-8 mx-auto mt-20 mb-4 bg-gray-300 shadow-md w-80 rounded-xl' onSubmit={handleSubmit}>
      <h1 className='mb-5 text-2xl font-bold text-center text-gray-800'>Login</h1>

      {error && <p className="mb-5 text-center text-red-500">{error}</p>}

      {loading && (
        <div className="flex items-center justify-center mb-5">
          <svg className="w-6 h-6 mr-3 text-gray-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0019.708 15H16v4.582zM20 12c0-4.418-3.582-8-8-8v4c2.22 0 4 1.79 4 4h4zm-2-1.709V7.001A7.97 7.97 0 0012 7v4.291l2.291 2.292z"></path>
          </svg>
          <span className="text-gray-600">Logging in...</span>
        </div>
      )}

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
        disabled={loading}
      >
        Log In
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

import React, { useState } from 'react';
import axios from 'axios';
import { login as authLogin } from '../store/authslice';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state

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
      // Check if the error has a response and a message
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Set error from backend response
      } else {
        setError(error.message || 'An error occurred'); 
        console.log(error)// Set generic error message
      }
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

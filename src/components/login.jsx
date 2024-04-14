jiimport React, { useState } from 'react';
import axios from 'axios';
import { login as authLogin } from '../store/authslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://backend-of-videotube.onrender.com/api/v1/users/login', {
        email,
        password,
      });
      const {  accessToken } = response.data.data;
      // Store the access token in local storage
    sessionStorage.setItem('accessToken', accessToken);
      
      // Dispatch authlogin action with email and access token
      dispatch(authLogin({ email, password }));

      if (response.data) {
        console.log(response.data)
        navigate("/");
        console.log(sessionStorage.getItem('accessToken'));

      }

    } catch (error) {
      console.error(error);
      setError(error.response.data.message); // Assuming error message is returned in response
    }
  };

  return (
    <form className='h-[300px] w-[300px] bg-slate-400 text-white flex flex-col gap-5 absolute top-[30%] left-[40%] rounded-2xl items-center' onSubmit={handleSubmit}>
      <h1 className='text-2xl text-center text-slate-800'>Login form</h1>

      {error && <h1 className="text-red-600 text-1xl">{error}</h1>}

      <input className="peer h-[50px] w-[200px] border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input className="peer h-[50px] w-[200px] border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="mt-2 text-base text-center text-white">
        new user?&nbsp;
        <Link
          to="/Registration"
          className="font-medium transition-all duration-200 text-primary hover:underline"
        >
          sign in
        </Link>
      </p>

      <button className='h-[50px] w-[100px] bg-slate-800 rounded-xl box-shadow-sm' type="submit">Login</button>
    </form>
  );
};

export default Login;

import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationDetails = ({ fullName, username, email, password, onChange, onSubmit }) => {
  return (
    <form className="flex flex-col items-center mx-12 space-y-4" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={onChange('fullName')}
        className="w-64 h-12 px-4 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={onChange('username')}
        className="w-64 h-12 px-4 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onChange('email')}
        className="w-64 h-12 px-4 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onChange('password')}
        className="w-64 h-12 px-4 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
      />
      <p className="text-sm text-gray-600">
        Already have an account?&nbsp;
        <Link to="/login" className="font-medium text-blue-500 hover:underline">
          Login
        </Link>
      </p>
      <button type="submit" className="w-64 h-12 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Next
      </button>
    </form>
  );
};



export{ RegistrationDetails};

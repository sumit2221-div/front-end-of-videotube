// ErrorPage.js

import React from 'react';

const ErrorPage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold text-red-600">Error</h1>
      <p className="text-lg text-gray-800">{message}</p>
      
    </div>
  );
};

export default ErrorPage;

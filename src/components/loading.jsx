import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-20 h-20 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-gray-900">Loading...</p>
    </div>
  );
};

export default Loading;

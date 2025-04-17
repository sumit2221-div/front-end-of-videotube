import React from 'react';

const Loading = ({ isOverlay = true }) => {
  return (
    <div
      className={`${
        isOverlay ? 'fixed inset-0 z-50 bg-black bg-opacity-50' : ''
      } flex flex-col items-center justify-center`}
    >
      <div className="w-20 h-20 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-gray-900">Loading...</p>
    </div>
  );
};

export default Loading;

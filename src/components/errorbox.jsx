// ErrorBox.js
import React from 'react';

const ErrorBox = ({ message }) => {
  return (
    <div className="text-red-700 bg-red-100 border border-red-400 rounded  absolute left-[10%]" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorBox;

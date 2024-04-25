import React from 'react';

const RegistrationFiles = ({ avatar, coverImage, onChange, onSubmit }) => {
  return (
    <form className="flex flex-col items-center mx-12 space-y-4" onSubmit={onSubmit}>
      <div className="w-64">
        <label htmlFor="avatar" className="block mb-1 text-sm font-medium text-black">Avatar:</label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={onChange('avatar')}
          className="w-full h-12 px-4 border border-gray-400 rounded-md focus:outline-none "
        />
      </div>
      <div className="w-64">
        <label htmlFor="coverImage" className="block mb-1 text-sm font-medium text-black">Cover Image:</label>
        <input
          type="file"
          id="coverImage"
          accept="image/*"
          onChange={onChange('coverImage')}
          className="w-full h-12 px-4 border border-gray-400 rounded-md focus:outline-none"
        />
      </div>
      <button type="submit" className="w-64 h-12 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Register
      </button>
    </form>
  );
};

export default RegistrationFiles;

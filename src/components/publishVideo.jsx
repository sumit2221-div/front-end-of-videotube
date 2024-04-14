import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PublishVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [videofile, setVideoFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading to true when submitting form

      if (!title || !description || !thumbnail || !videofile) {
        throw new Error("Please provide title, description, thumbnail, and video file");
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('thumbnail', thumbnail);
      formData.append('videofile', videofile);

      const response = await axios.post('https://backend-of-videotube.onrender.com/api/v1/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      console.log('Video published successfully:', response.data);

      setLoading(false); // Set loading to false after successful upload

      if (response.data) {
        navigate("/");
      }
    } catch (error) {
      console.error('Error publishing video:', error.message);
      setErrorMessage(error.message);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  return (
    <div className="h-500px w-[500px] absolute top-[30%] left-[40%]">
      <h2 className="mb-4 text-2xl font-bold">Publish Video</h2>
      {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          rows="4"
        />
        <input
          type="file"
          onChange={handleThumbnailChange}
          accept="image/*"
          className="mb-4"
        />
        <input
          type="file"
          onChange={handleVideoFileChange}
          accept="video/*"
          className="mb-4"
        />
      
        {loading ? (
          <button
            type="button"
            className="px-4 py-2 font-bold text-white bg-gray-500 rounded cursor-not-allowed"
            disabled
          >
            Publishing...
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Publish Video
          </button>
        )}
      </form>
    </div>
  );
};

export default PublishVideo;

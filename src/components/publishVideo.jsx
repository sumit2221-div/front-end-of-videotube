import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publishVideo } from '../api/videoApi'; // Import the centralized API function

const PublishVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [videofile, setVideoFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error state
    setLoading(true); // Set loading to true when submitting form

    try {
      // Validate form fields
      if (!title || !description || !thumbnail || !videofile) {
        throw new Error('Please provide title, description, thumbnail, and video file.');
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('thumbnail', thumbnail);
      formData.append('videofile', videofile);

      // Use the centralized API function to publish the video
      const response = await publishVideo(formData);

      

      console.log('Video published successfully:', response);

      // Reset form fields after successful submission
      setTitle('');
      setDescription('');
      setThumbnail(null);
      setVideoFile(null);

      navigate('/'); // Redirect to the homepage
    } catch (error) {
      console.error('Error publishing video:', error);
      setErrorMessage(error.message || 'An error occurred while publishing the video.');
    } finally {
      setLoading(false); // Set loading to false after submission
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
        <textarea
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

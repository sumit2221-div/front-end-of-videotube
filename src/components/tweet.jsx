import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTweet } from '../api/tweetApi'; // Import the centralized API function

function CreateTweet() {
  const [content, setContent] = useState('');
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(''); // Add error state
  const navigate = useNavigate();

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error state
    setLoading(true); // Set loading state to true

    try {
      // Validate form fields
      if (!content.trim() || !picture) {
        throw new Error('Both content and picture are required.');
      }

      const formData = new FormData();
      formData.append('content', content);
      formData.append('picture', picture);

      // Use the centralized API function to create a tweet
      const response = await createTweet(formData);

      // Reset form fields after successful submission
      setContent('');
      setPicture(null);

      console.log('Tweet created successfully:', response);
      navigate('/tweets'); // Redirect to the tweets page
    } catch (error) {
      console.error('Error creating tweet:', error);
      setError(error.message || 'An error occurred while creating the tweet.');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="max-w-xl p-4 mx-auto mt-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold">Create Tweet</h2>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="picture" className="block text-sm font-medium text-gray-700">Picture:</label>
          <input
            type="file"
            id="picture"
            accept="image/*"
            onChange={handlePictureChange}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default CreateTweet;

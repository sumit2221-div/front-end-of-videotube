import React, { useState } from 'react';
import axios from 'axios'; // Changed Axios to axios

function CreateTweet() {
  const [content, setContent] = useState('');
  const [picture, setPicture] = useState(null);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('picture', picture);
  
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:4000/api/v1/tweets', formData, { // Removed body from Axios post method
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
    
      // Reset form fields after successful submission
      setContent('');
      setPicture(null);
      
      console.log('Tweet created successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error creating tweet:', error);
    }
  };
  

  return (
    <div className="max-w-xl p-4 mx-auto mt-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold">Create Tweet</h2>
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
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
}

export default CreateTweet;

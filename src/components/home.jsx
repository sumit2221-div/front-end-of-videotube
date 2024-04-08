import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoCard from "./videocard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/video`, {
          params: {
            page: currentPage,
            limit: 10 // Adjust the limit as needed
          },
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const videosWithOwnerData = await Promise.all(response.data.data.videos.map(async (video) => {
          try {
            const ownerResponse = await axios.get(`http://localhost:4000/api/v1/users/${video.owner}`, {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            });
            const ownerData = ownerResponse.data.data;
            return { ...video, owner: ownerData };
          } catch (error) {
            console.error(`Error fetching owner data for video ${video.id}:`, error);
            // Return the video without owner data if fetching owner data fails
            return video;
          }
        }));

        setVideos(videosWithOwnerData);
        setTotalPages(response.data.data.totalPages);
      
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [accessToken, currentPage]);

  const handleNextPage = () => {
  
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container px-4 py-8 mx-10 mt-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map(video => (
          <div key={video.id}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
      <div className="flex mx-[40%] pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Previous
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;

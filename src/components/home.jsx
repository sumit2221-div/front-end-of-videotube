import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoCard from "./videocard"
import ErrorPage from "./error";
import { BiArrowBack , BiArrowToRight} from "react-icons/bi";

const Home = ({ searchQuery }) => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    fetchVideos();
  }, [searchQuery, currentPage]);

  const fetchVideos = async () => {
    try {
      const accessToken =  sessionStorage.getItem('accessToken')
      const response = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/video`, {
        params: {
          page: currentPage,
          limit: 12,
          search: searchQuery
        },
        headers: {
          'Authorization':  `Bearer ${accessToken}`
        
        }
      });
    

      const videosWithOwnerData = await Promise.all(response.data.data.videos.map(async (video) => {
        try {
          const ownerResponse = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/users/${video.owner}`, {
            headers: {
              'Authorization':  `Bearer ${accessToken}`
            
            }
          });
          const ownerData = ownerResponse.data.data;
          
          return { ...video, owner: ownerData };
        } catch (error) {
          console.error(`Error fetching owner data for video ${video.id}:`, error);
          return video;
        }
      }));

      setVideos(videosWithOwnerData);
      setTotalPages(response.data.data.totalPages);
      console.log(accessToken)
    
    
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Failed to fetch videos. Please try again later.'); // Set error message
  
    }
  };

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

  if (error) {
    return <ErrorPage message={error} />; // Render error page if there's an error
  }

  return (
    <div className="container h-auto gap-10 mx-10 ">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map(video => (
          <div key={video.id}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
      <div className="flex mx-[40%] pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          <BiArrowBack/>
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          <BiArrowToRight/>
        </button>
      </div>
    </div>
  );
};

export default Home;

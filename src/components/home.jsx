import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoCard from "./videocard";
import ErrorPage from "./errorbox"
import { BiArrowBack, BiArrowToRight } from "react-icons/bi";

const Home = ({ searchQuery }) => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null); // State to store error message
  const [loading, setLoading] = useState(false); // State to track loading status

  useEffect(() => {
    fetchVideos();
  }, [searchQuery, currentPage]);

  const fetchVideos = async () => {
    setLoading(true); // Set loading to true when fetching starts

    try {
      const response = await axios.get(
        `https://backend-of-videotube.onrender.com/api/v1/video`,
        {
          params: {
            page: currentPage,
            limit: 12,
            search: searchQuery,
          },
        }
      );

      const videosWithOwnerData = await Promise.all(
        response.data.data.videos.map(async (video) => {
          try {
            const ownerResponse = await axios.get(
              `https://backend-of-videotube.onrender.com/api/v1/users/${video.owner}`
            );
            const ownerData = ownerResponse.data.data;

            return { ...video, owner: ownerData };
          } catch (error) {
            console.error(`Error fetching owner data for video ${video.id}:`, error);
            return video;
          }
        })
      );

      setVideos(videosWithOwnerData);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to fetch videos. Please try again later."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetching completes
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

  if (loading) {
    return (
      
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-transparent">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: "-0.3s" }}></div>
        <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: "-0.5s" }}></div>
      </div>
    </div>
    )
  }

  if (error) {
    return <ErrorPage message={error} />; // Render error page if there's an error
  }

  return (
    <div className="container h-auto gap-10 mx-20">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div key={video.id}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
      <div className="flex mx-[40%] pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          <BiArrowBack />
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          <BiArrowToRight />
        </button>
      </div>
    </div>
  );
};

const FullScreenLoader = () => (
  <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-200">
    <div className="w-12 h-12 mb-4 ease-linear border-4 border-t-4 border-gray-500 rounded-full loader"></div>
  </div>
);

export default Home;

import React, { useState, useEffect } from "react";
import { fetchAllVideos } from "../api/videoApi"; // Import the API function
import { fetchUserById } from "../api/userApi"; // Import user API function
import VideoCard from "./videocard";
import ErrorPage from "./errorbox";
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
    setError(null); // Reset error state before fetching

    try {
      // Fetch videos using the API service
      const response = await fetchAllVideos({
        page: currentPage,
        limit: 12,
        search: searchQuery,
      });

      // Fetch owner data for each video
      const videosWithOwnerData = await Promise.all(
        response.videos.map(async (video) => {
          try {
            const ownerData = await fetchUserById(video.owner);
            return { ...video, owner: ownerData };
          } catch (error) {
            console.error(`Error fetching owner data for video ${video.id}:`, error);
            return video;
          }
        })
      );

      setVideos(videosWithOwnerData);
      setTotalPages(response.totalPages);
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
    return <FullScreenLoader />;
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

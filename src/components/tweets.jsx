import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchTweets();

    // Add event listener for scroll
    containerRef.current.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      containerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [scroll]); // Run only once when component mounts

  const fetchTweets = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const accessToken = sessionStorage.getItem('accessToken');
      const response = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/tweets/`, {
        params: {
          page : 1,
          limit: 1 // Load only one tweet per page
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const newTweets = response.data.data.tweets;
      setTweets(prevTweets => [...prevTweets, ...newTweets]); // Append new tweets to existing tweets
     
      console.log(response.data); // Check if there are more tweets to fetch
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }

    setLoading(false);
  };

  const handleScroll = () => {
    const container = containerRef.current;

    if (container.scrollHeight - container.scrollTop === container.clientHeight) {
      fetchTweets(); // Fetch next tweet when scrolled to the bottom
    }
  };

  return (
    <div ref={containerRef} className="max-w-2xl p-4 mx-auto" style={{ overflowY: 'scroll', height: '80vh' }}>
      <h1 className="mb-4 text-2xl font-bold">Tweets</h1>
      {loading && tweets.length === 0 && <p>Loading...</p>}
      {tweets.length > 0 && (
        <div>
          <div key={tweets._id} className="mb-4"> {/* Show only the last fetched tweet */}
            <p>{tweets.content}</p>
            {tweets.picture && <img src={tweets.picture} alt="Tweet Picture" className="mt-2" />}
          </div>
          {loading && <p>Loading more tweets...</p>}
        </div>
      )}
      {!loading && !hasMore && tweets.length === 0 && <p>No tweets available.</p>}
    </div>
  );
};

export default Tweets;

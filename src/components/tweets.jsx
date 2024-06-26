import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiLike, BiComment, BiShare } from 'react-icons/bi';
import { GoX } from "react-icons/go";
import ErrorBox from './errorbox';

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://backend-of-videotube.onrender.com/api/v1/tweet', {
        params: { page: 1, limit: 10 },
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      setLiked(response.data.datalikestatus);
      const tweetsWithOwnerData = await Promise.all(
        response.data.data.tweets.map(async (tweet) => {
          try {
            const ownerResponse = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/users/${tweet.owner}`);
            const ownerData = ownerResponse.data.data;
            return { ...tweet, owner: ownerData };
          } catch (error) {
            console.error(`Error fetching owner data for tweet ${tweet.id}:`, error);
            return tweet;
          }
        })
      );
      setTweets(tweetsWithOwnerData);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(error.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchTweetComments = async (tweetId) => {
    try {
      const response = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/comment/t/${tweetId}`);
      console.log(response.data.data.comments)
      const commentwithownerdata = await Promise.all(
        response.data.data.comments.map(async (comment) => {
          try {
            const ownerResponse = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/users/${comment.owner}`);
            const ownerData = ownerResponse.data.data;
            return { ...comment, owner: ownerData };
          } catch (error) {
            console.error(`Error fetching owner data for comments ${comments.id}:`, error);
            return comments;
          }
        })
      );
      setComments(commentwithownerdata)
      console.log(commentwithownerdata)
    } catch (error) {
      console.error(`Error fetching comments for tweet ${tweetId}:`, error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(error.message || 'An error occurred');
      }
    }
  };

  const handleLikeButton = async (tweetId) => {
    if (!accessToken) {
      alert("You have to login first to like this tweet.");
      return;
    }
    try {
      const response = await axios.post(`https://backend-of-videotube.onrender.com/api/v1/like/toggle/t/${tweetId}`, {}, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      console.log(response.data);
      // Optionally update liked state or UI based on response
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(error.message || 'An error occurred');
      }
    }
  };

  const handleTweetClick = (tweet) => {
    setSelectedTweet(tweet);
    fetchTweetComments(tweet._id);
  };

  const handleCloseTweetCard = () => {
    setSelectedTweet(null);
    setComments([]);
  };

  const handleTweetComment = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (!accessToken) {
      alert("You have to login first to comment on this tweet.");
      return;
    }
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }
    try {
      const response = await axios.post(
        `https://backend-of-videotube.onrender.com/api/v1/comment/t/${selectedTweet._id}`,
        { content: newComment },
        {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        }
      );
      setComments([...comments, response.data.data.comment]);
      setNewComment("");
    } catch (error) {
      console.error(`Error posting comment for tweet ${selectedTweet._id}:`, error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(error.message || 'An error occurred');
      }
    }
  };
  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      {loading ? (
         <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-transparent">
         <div className="flex flex-row gap-2">
           <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce"></div>
           <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: "-0.3s" }}></div>
           <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce" style={{ animationDelay: "-0.5s" }}></div>
         </div>
       </div>
      ) : (
        <div className='flex flex-wrap w-[600px] gap-8'>
          {tweets.map(tweet => (
            <div
              key={tweet.id}
              className='w-[500px] h-[600px] bg-white shadow-lg rounded-xl p-4 cursor-pointer'
              onClick={() => handleTweetClick(tweet)}
            >
              <div className='flex items-center mb-4'>
                <img className='h-[50px] w-[50px] rounded-full mr-3' src={tweet.owner.avatar} alt={tweet.owner.name} />
                <div>
                  <p className='font-bold'>{tweet.owner.name}</p>
                  <p className='text-sm text-gray-500'>@{tweet.owner.username}</p>
                </div>
              </div>
              <p className='mb-4'>{tweet.content}</p>
              {tweet.picture && <img className='h-[400px] w-full rounded-lg object-cover' src={tweet.picture} alt="Tweet" />}
              <div className='flex gap-3 mt-4'>
                <button
                  onClick={() => handleLikeButton(tweet._id)}
                  className={`flex items-center justify-center w-12 h-12 text-xl rounded-full ${liked ? 'bg-blue-500 text-white' : 'bg-gray-100'} hover:bg-gray-200`}
                >
                  <BiLike />
                </button>
                <button className='flex items-center justify-center w-12 h-12 text-xl bg-gray-100 rounded-full hover:bg-gray-200'>
                  <BiComment />
                </button>
                <button className='flex items-center justify-center w-12 h-12 text-xl bg-gray-100 rounded-full hover:bg-gray-200'>
                  <BiShare />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTweet && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white w-[600px] p-4  relative  h-[550px] overflow-scroll rounded-xl ">
            <button
              className="absolute text-2xl text-red-500 top-2 right-2"
              onClick={handleCloseTweetCard}
            >
              <GoX />
            </button>
            <div className="flex items-center mb-4">
              <img
                className="h-[50px] w-[50px] rounded-full mr-3"
                src={selectedTweet.owner.avatar}
                alt={selectedTweet.owner.name}
              />
              <div>
                <p className="font-bold">{selectedTweet.owner.name}</p>
                <p className="text-sm text-gray-500">@{selectedTweet.owner.username}</p>
              </div>
            </div>
            <p className="mb-4">{selectedTweet.content}</p>
            {selectedTweet.picture && (
              <img
                className="h-[400px] w-full rounded-lg object-cover mb-4"
                src={selectedTweet.picture}
                alt="Tweet"
              />
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleLikeButton(selectedTweet._id)}
                className={`flex items-center justify-center w-12 h-12 text-xl rounded-full ${
                  liked ? 'bg-blue-500 text-white' : 'bg-gray-100'
                } hover:bg-gray-200`}
              >
                <BiLike />
              </button>
              <button className="flex items-center justify-center w-12 h-12 text-xl bg-gray-100 rounded-full hover:bg-gray-200">
                <BiComment />
              </button>
              <button className="flex items-center justify-center w-12 h-12 text-xl bg-gray-100 rounded-full hover:bg-gray-200">
                <BiShare />
              </button>
            </div>
            <div className="mt-4">
              <h3 className="mb-2 font-bold">Comments</h3>
              {comments.length > 0 && (
                <div className="comment-container" style={{ maxHeight: showAllComments ? 'none' : '200px', overflowY: 'auto' }}>
                  <ul className="divide-y divide-gray-200">
                    {comments.slice(0, showAllComments ? comments.length : 1).map((comment, index) => (
                      <li key={index} className="py-2">
                        <div className="flex items-center">
                          <img
                            className="w-8 h-8 mr-2 rounded-full"
                            src={comment.owner.avatar}
                            alt={comment.owner.username}
                          />
                          <p className="text-sm font-medium">{comment.owner.username}</p>
                        </div>
                        <p className="text-sm text-gray-600">{comment.content}</p>
                      </li>
                    ))}
                  </ul>
                  {comments.length > 1 && (
                    <button
                      className="mt-2 text-sm text-blue-500 cursor-pointer focus:outline-none"
                      onClick={toggleShowAllComments}
                    >
                      {showAllComments ? 'Show less comments' : 'Show more comments'}
                    </button>
                  )}
                </div>
              )}
              {comments.length === 0 && (
                <p className="text-sm text-gray-600">No comments yet.</p>
              )}
            </div>
            <form onSubmit={handleTweetComment} className="mt-4">
              <div className="relative">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="block w-full px-4 py-2 text-sm text-gray-700 bg-transparent border border-gray-300 rounded-2xl ring-2 ring-transparent focus:border-gray-500 focus:ring-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Submit"
                  className="absolute inset-y-0 right-0 flex items-center justify-center h-full px-3 text-white bg-gray-500 rounded-xl hover:bg-gray-600"
                >
                  <svg
                    viewBox="0 0 16 6"
                    aria-hidden="true"
                    className="w-4 transform rotate-90"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tweets;

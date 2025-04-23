import React, { useState, useEffect } from 'react';
import { BiLike, BiComment, BiShare } from 'react-icons/bi';
import { GoX } from "react-icons/go";
import { fetchAllTweets } from '../api/tweetApi'; // Import tweet-related APIs
import { fetchTweetComments, addTweetComment } from '../api/commentApi'; // Import comment-related APIs
import { toggleTweetLike } from '../api/likeApi'; // Import like-related APIs

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    setLoading(true);
    try {
      const tweetsData = await fetchAllTweets({ page: 1, limit: 10 });
      setTweets(tweetsData);
    } catch (error) {
      console.error(error);
      setError(error.message || 'An error occurred while fetching tweets.');
    } finally {
      setLoading(false);
    }
  };

  const handleLikeButton = async (tweetId) => {
    try {
      const message = await toggleTweetLike(tweetId);
      console.log(message);
      // Optionally update UI or liked state
    } catch (error) {
      console.error(error);
      setError(error.message || 'An error occurred while liking the tweet.');
    }
  };

  const handleTweetClick = async (tweet) => {
    setSelectedTweet(tweet);
    try {
      const commentsData = await fetchTweetComments(tweet._id);
      setComments(commentsData);
    } catch (error) {
      console.error(error);
      setError(error.message || 'An error occurred while fetching comments.');
    }
  };

  const handleCloseTweetCard = () => {
    setSelectedTweet(null);
    setComments([]);
  };

  const handleTweetComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }
    try {
      const comment = await addTweetComment(selectedTweet._id, newComment);
      setComments([...comments, comment]);
      setNewComment("");
    } catch (error) {
      console.error(error);
      setError(error.message || 'An error occurred while adding the comment.');
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
              key={tweet._id}
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
                  className="flex items-center justify-center w-12 h-12 text-xl bg-gray-100 rounded-full hover:bg-gray-200"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[600px] p-4 relative h-[550px] overflow-scroll rounded-xl">
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
                className="flex items-center justify-center w-12 h-12 text-xl bg-gray-100 rounded-full hover:bg-gray-200"
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

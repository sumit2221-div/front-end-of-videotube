import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike, AiOutlineWhatsApp } from "react-icons/ai";
import CommentList from './Commentlist';
import { fetchVideoById, fetchLikesByVideoId, toggleLike } from '../api/videoApi'; // Centralized video APIs
import { fetchCommentsByVideoId, addComment } from '../api/commentApi'; // Centralized comment APIs
import { fetchUserById, fetchCurrentUser } from '../api/userApi'; // Centralized user APIs
import { subscribeToChannel } from '../api/subscriptionApi'; // Centralized subscription API

const VideoPlayer = () => {
  const [video, setVideo] = useState(null);
  const [owner, setOwner] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch video details
        const videoData = await fetchVideoById(id);
        setVideo(videoData);
        setLiked(videoData.likestatus);
        setIsSubscribed(videoData.isSubscriber);

        // Fetch owner details
        const ownerData = await fetchUserById(videoData.owner);
        setOwner(ownerData);

        // Fetch comments
        const commentsData = await fetchCommentsByVideoId(id);
        setComments(commentsData);

        // Fetch current user details
        const currentUser = await fetchCurrentUser();
        setUserAvatar(currentUser.avatar);

        // Fetch likes and dislikes
        const likesData = await fetchLikesByVideoId(id);
        setLikes(likesData.totalLikes);

        // Fetch subscriber count
        setSubscriberCount(ownerData.subscribersCount);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleLikeToggle = async () => {
    try {
      await toggleLike(id);
      setLiked(!liked);
      setDisliked(false); // Reset dislike state
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDislikeToggle = async () => {
    try {
      await toggleLike(id); // Assuming the same API toggles dislikes
      setDisliked(!disliked);
      setLiked(false); // Reset like state
      setDislikes((prev) => (disliked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error('Error toggling dislike:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await addComment(id, newComment);
      setNewComment('');
      setIsInputFocused(false);

      // Refresh comments
      const updatedComments = await fetchCommentsByVideoId(id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleSubscribe = async () => {
    try {
      await subscribeToChannel(owner._id);
      setIsSubscribed(true);
      setSubscriberCount((prev) => prev + 1);
    } catch (error) {
      console.error('Error subscribing to channel:', error);
    }
  };

  const handleShareWhatsApp = () => {
    const whatsappLink = `https://wa.me/?text=Check out this video: ${window.location.href}`;
    window.open(whatsappLink, '_blank');
  };

  if (!video || !owner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-auto gap-5 mx-12 rounded-xl">
      <video className="h-[500px] w-[900px] rounded-2xl bg-gray-600 object-cover" controls>
        <source src={video.videofile} />
        Your browser does not support the video tag.
      </video>
      <div className="h-[100px] w-[900px] bg-transparent rounded-xl">
        <h1 className="text-2xl text-white">{video.title}</h1>
        {owner && (
          <div className="flex items-center gap-5">
            <Link to={`/user/c/${owner.username}`}>
              <img className="h-[40px] w-[40px] rounded-full" src={owner.avatar} alt={owner.username} />
            </Link>
            <h1 className="text-white">{owner.username}</h1>
            <button onClick={handleSubscribe} className="h-[50px] w-[100px] rounded-xl bg-slate-500">
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        )}
        <div className="flex gap-3 mt-3">
          <button onClick={handleShareWhatsApp} className="h-10 w-[100px] rounded-xl bg-green-500 flex items-center justify-center text-2xl text-white">
            <AiOutlineWhatsApp />
          </button>
          <button
            className={`flex items-center justify-center w-24 h-10 rounded-md ${liked ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={handleLikeToggle}
          >
            {liked ? <AiFillLike className="mr-1" /> : <AiOutlineLike className="mr-1" />} Like <span>{likes}</span>
          </button>
          <button
            className={`flex items-center justify-center w-24 h-10 rounded-md ${disliked ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={handleDislikeToggle}
          >
            {disliked ? <AiFillDislike className="mr-1" /> : <AiOutlineDislike className="mr-1" />} Dislike <span>{dislikes}</span>
          </button>
        </div>
        <div className="h-[100px] w-[900px] bg-gray-900 text-white rounded-xl">
          <h1>{video.views} views</h1>
          <div>
            <p>{video.description}</p>
            <button onClick={() => setShowDescription(!showDescription)} className="relative mt-8 text-white">
              {showDescription ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>
        <div>
          <form className="h-[100px] w-[900px] rounded-xl flex" onSubmit={handleSubmitComment}>
            <div className="flex items-center w-full">
              <img src={userAvatar} className="h-[40px] w-[40px] rounded-full" alt="User Avatar" />
              <input
                className="w-[800px] h-[50px] bg-transparent border-b text-white mb-2 outline-none"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                onFocus={() => setIsInputFocused(true)}
              />
              {isInputFocused && (
                <button className="h-[40px] w-[50px] text-white rounded-xl bg-blue-500" type="submit">
                  Submit
                </button>
              )}
            </div>
          </form>
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

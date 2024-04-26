import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import CommentList from './Commentlist';

const VideoPlayer = () => {
  const [video, setVideo] = useState(null);
  const [owner, setOwner] = useState(null);
  const [liked, setLiked] = useState(false); // State to track liked status
  const [disliked, setDisliked] = useState(false); // State to track disliked status
  const { id } = useParams();
  const [comments, setComments] = useState([]); // State to store comments
  const [newComment, setNewComment] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');
  const [useravatar, setUserAvatar] = useState(null)
  const [likes , setlikes] = useState(null)
  const [dislikes , setDislikes] = useState(null)
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriber, setsubscriber]=  useState(null)
  

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoResponse = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/video/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setVideo(videoResponse.data.data);
        console.log(videoResponse.data.data)

        const ownerResponse = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/users/${videoResponse.data.data.owner}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setOwner(ownerResponse.data.data);

        // Fetch comments for the video
        const commentsResponse = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/comment/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setComments(commentsResponse.data.data.comments);
      
            
              
              const response = await axios.get('https://backend-of-videotube.onrender.com/api/v1/users/current-user', {
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                }
              });
              setUserAvatar(response.data.data.avatar);

              console.log("User fetched successfully");

              const LikeRes = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/like/v/${id}`,{
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
      })
      setlikes(LikeRes.data.data.allLikes)
      
      console.log(LikeRes.data.data.allLikes)

      const subsRes = await axios.get(`https://backend-of-videotube.onrender.com/api/v1/subscription/c/${videoResponse.data.data.owner}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }

      })
if(subsRes){
  setsubscriber(subsRes.data.data.length)
  console.log(subsRes.data.data.length)
}
    
    

      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();

  }, [id, accessToken, liked]);

  const handleLikeToggle = async () => {
    try {
      const response = await axios.post(`https://backend-of-videotube.onrender.com/api/v1/like/toggle/v/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.status === 200) {
        setLiked(!liked);
        setDisliked(false); 
        // Ensure that only one of like/dislike can be selected
      }
      console.log(response.data)
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDislikeToggle = async () => {
    try {
      const response = await axios.post(`https://backend-of-videotube.onrender.com/api/v1/like/toggle/v/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.status === 200) {
        setDisliked(!disliked);
        setLiked(false); // Ensure that only one of like/dislike can be selected
      }
    } catch (error) {
      console.error('Error toggling dislike:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://backend-of-videotube.onrender.com/api/v1/comment/${id}`,
        { content: newComment },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        `https://backend-of-videotube.onrender.com/api/v1/subscription/c/${owner._id}`,
        {}, // Empty data for POST request body
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
  
      if (response.status === 200) {
        // Subscription successful, update state
        setIsSubscribed(true);
        console.log('Subscription successful');
        console.log(response.data);
      } else {
        // Handle subscription failure
        console.error('Subscription failed');
      }
    } catch (error) {
      // Check if the error is due to unauthorized access
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access:', error.response.data);
        // You may want to redirect the user to the login page or display an error message
      } else {
        console.error('Error subscribing:', error);
      }
    }
  };


  

  
  if (!video || !owner) {
    return <div>Loading...</div>;
  }
  const buttonText = isSubscribed ? 'Subscribed' :  'Subscribe'

  return (
    <div className='flex flex-col w-full h-auto gap-5 mx-12 rounded-xl'>
      <video className='h-[500px] w-[900px] rounded-2xl  relative top-4 left-8  bg-gray-600 object-cover' controls>
        <source src={video.videofile} />
        Your browser does not support the video tag.
      </video>
      <div className='h-[100px] w-[900px] bg-transparent relative left-8 rounded-xl'>
        <h1 className='text-2xl text-white'>{video.title}</h1>
        {owner && (
          <div className='flex items-center gap-5'>
            <img className='h-[40px] w-[40px] rounded-full' src={owner.avatar} alt={owner.username} />
            <h1 className='text-white'>{owner.username}</h1>
            <button onClick={handleSubscribe} className='h-[50px] w-[100px] rounded-xl bg-slate-500'>{buttonText}</button>
          </div>
        )}
        <div className='absolute right-0 flex gap-3 mt-3 top-3'>

     
          <button className={`flex items-center justify-center w-24 h-10 rounded-md focus:outline-none ${liked ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`} onClick={handleLikeToggle} disabled={liked}>
            {liked ? <AiFillLike className='mr-1' /> : <AiOutlineLike className='mr-1' />} Like <span>{likes}</span>
          </button>
          <button className={`flex items-center justify-center w-24 h-10 rounded-md focus:outline-none ${disliked ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}`} onClick={handleDislikeToggle} disabled={!liked}>
            {disliked ? <AiFillDislike className='mr-1' /> : <AiOutlineDislike className='mr-1' />} Dislike  <span>{dislikes}</span>
          </button>
        </div>
        <div className='h-[100px] w-[900px] bg-gray-900 text-white rounded-xl'>
          <h1>{video.views} views</h1>
          <div>
            <p>{video.description}</p>
            <button onClick={() => setShowDescription(!showDescription)} className="relative mt-8 text-white">{showDescription ? "Show Less" : "Show More"}</button>
          </div>
        </div>

        <div>
          <form className='h-[100px] w-[900px] rounded-xl flex' onSubmit={handleSubmit}>
            <div className="flex items-center w-full">
              <img src={useravatar} className='h-[40px] w-[40px] rounded-full' /> {/* Display logged-in user's avatar */}
              <input
                className='w-[800px] h-[50px] bg-transparent border-b text-white mb-2 outline-none focus:ring-0'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder='Add a comment...'
                onFocus={() => setIsInputFocused(true)}
              />
              {isInputFocused && (
                <button className="h-[40px] w-[50px] text-white rounded-xl bg-blue-500 shadow-xl" type="submit">Submit</button>
              )}
            </div>
          </form>
          {/* Pass comments array to CommentList component */}
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

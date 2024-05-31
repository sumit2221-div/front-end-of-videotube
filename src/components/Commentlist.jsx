import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMoreVertical } from "react-icons/fi";

import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const CommentList = ({ comments }) => {
  const [owners, setOwners] = useState({});
  const [totalComments, setTotalComments] = useState(0); // State to store total count of comments
  const [currentUserId, setCurrentUserId] = useState(null); // State to store current user ID
  const [showdropdown, setShowDropdown] = useState(false)


  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('https://backend-of-videotube.onrender.com/api/v1/users/current-user', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        });
        setCurrentUserId(response.data.data._id);
      } catch (error) {
        console.error('Error fetching current user data:', error);
      }
    };

    const fetchOwners = async () => {
      try {
        const ownerIds = comments.map(comment => comment.owner);
        const uniqueOwnerIds = [...new Set(ownerIds)]; // Get unique owner IDs

        const ownersData = await Promise.all(
          uniqueOwnerIds.map(ownerId =>
            axios.get(`https://backend-of-videotube.onrender.com/api/v1/users/${ownerId}`, {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
              },
            })
          )
        );

        const ownersMap = {};
        ownersData.forEach(response => {
          ownersMap[response.data.data._id] = response.data.data;
        });
        setOwners(ownersMap);
      } catch (error) {
        console.error('Error fetching owner data:', error);
      }
    };

    fetchCurrentUser();

    if (comments.length > 0) {
      fetchOwners();
      setTotalComments(comments.length); // Update total count of comments
    }
  }, [comments]);

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`https://backend-of-videotube.onrender.com/api/v1/comment/c/${commentId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
      if (response.status === 200) {
        // Remove the deleted comment from the state
        const updatedComments = comments.filter(comment => comment._id !== commentId);
        setTotalComments(updatedComments.length); // Update total comments count
        // Update comments state with the filtered array
        setShowDropdown(false)
       
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className='h-[500px] w-[900px]'>
      <h2 className='text-2xl text-white'>{totalComments} Comments</h2>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment._id} className='h-[70px] w-full bg-transparent flex items-center justify-between text-white shadow-xl'>
            <div className='flex items-center'>
              <img src={owners[comment.owner]?.avatar} className='h-[40px] w-[40px] rounded-full' alt='Owner Avatar' />
              <div className='ml-2'>
                <p>{owners[comment.owner]?.username}</p>
                <p>{comment.content}</p>
              </div>
            </div>
            {comment.owner === currentUserId && (
              <div>
                <button onClick={() => setShowDropdown(!showdropdown)}><FiMoreVertical/></button>
                {showdropdown && (
                  <div className='h-[50px] w-[30px] bg-slate-200 text-black text-xl rounded-xl relative left-10'>
              <button onClick={() => handleDeleteComment(comment._id)} ><MdDelete/></button>
              <button ><FiEdit2/></button>
              </div>
              
                )}
              </div>

            )}
          </div>
        ))
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
}

export default CommentList;

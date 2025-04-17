import React, { useState, useEffect } from 'react';
import { fetchCurrentUser, getUserById } from '../api/userApi'; // Import centralized user APIs
import { deleteComment } from '../api/commentApi'; // Import centralized comment API
import { FiMoreVertical, FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const CommentList = ({ comments }) => {
  const [owners, setOwners] = useState({});
  const [totalComments, setTotalComments] = useState(0); // State to store total count of comments
  const [currentUserId, setCurrentUserId] = useState(null); // State to store current user ID
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      try {
        const currentUser = await fetchCurrentUser(); // Fetch current user using centralized API
        setCurrentUserId(currentUser._id);
      } catch (error) {
        console.error('Error fetching current user data:', error);
      }
    };

    const fetchOwnersData = async () => {
      try {
        const ownerIds = comments.map(comment => comment.owner);
        const uniqueOwnerIds = [...new Set(ownerIds)]; // Get unique owner IDs

        const ownersData = await Promise.all(
          uniqueOwnerIds.map(ownerId => getUserById(ownerId)) // Fetch owner data using centralized API
        );

        const ownersMap = {};
        ownersData.forEach(owner => {
          ownersMap[owner._id] = owner;
        });
        setOwners(ownersMap);
      } catch (error) {
        console.error('Error fetching owner data:', error);
      }
    };

    fetchCurrentUserData();

    if (comments.length > 0) {
      fetchOwnersData();
      setTotalComments(comments.length); // Update total count of comments
    }
  }, [comments]);

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId); // Use centralized API to delete comment
      const updatedComments = comments.filter(comment => comment._id !== commentId);
      setTotalComments(updatedComments.length); // Update total comments count
      setShowDropdown(false);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className='h-[500px] w-[900px]'>
      <h2 className='text-2xl text-white'>{totalComments} Comments</h2>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment._id} className='h-[70px] w-full bg-transparent flex items-center justify-between text-white shadow-xl'>
            <div className='flex items-center'>
              <img src={owners[comment.owner]?.avatar || 'default-avatar.png'} className='h-[40px] w-[40px] rounded-full' alt='Owner Avatar' />
              <div className='ml-2'>
                <p>{owners[comment.owner]?.username || 'Unknown User'}</p>
                <p>{comment.content}</p>
              </div>
            </div>
            {comment.owner === currentUserId && (
              <div>
                <button onClick={() => setShowDropdown(!showDropdown)}><FiMoreVertical /></button>
                {showDropdown && (
                  <div className='h-[50px] w-[30px] bg-slate-200 text-black text-xl rounded-xl relative left-10'>
                    <button onClick={() => handleDeleteComment(comment._id)}><MdDelete /></button>
                    <button><FiEdit2 /></button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-white">No comments available</p>
      )}
    </div>
  );
};

export default CommentList;

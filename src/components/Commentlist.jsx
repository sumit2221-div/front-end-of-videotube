import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ comments }) => {
  const [owners, setOwners] = useState({});
  const [totalComments, setTotalComments] = useState(0); // State to store total count of comments

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const ownerIds = comments.map(comment => comment.owner);
        const uniqueOwnerIds = [...new Set(ownerIds)]; // Get unique owner IDs

        const ownersData = await Promise.all(
          uniqueOwnerIds.map(ownerId =>
            axios.get(`https://backend-of-videotube.onrender.com/api/v1/users/${ownerId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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

    if (comments.length > 0) {
      fetchOwners();
      setTotalComments(comments.length); // Update total count of comments
    }
  }, [comments]);

  return (
    <div className='h-[500px] w-[900px]'>
      <h2 className='text-2xl text-white'>  {totalComments}Comments</h2>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment._id} className='h-[70px] w-full bg-transparent flex items-center text-white hover:shadow-xl hover:shadow-slate-700'>
            <img src={owners[comment.owner]?.avatar} className='h-[40px] w-[40px] rounded-full' alt='Owner Avatar' />
            <div className='ml-2'>
            
              <p> {owners[comment.owner]?.username}</p>
              <p>{comment.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default CommentList;

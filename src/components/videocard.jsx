
  import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const VideoCard = ({ video }) => {
  

  
 
  
  
  return (
    <Link to={`video/${video._id}`}>
    <div className="overflow-hidden bg-white rounded-lg shadow-lg w-[400px] flex flex-wrap  ">
      <img className="object-cover object-center w-full h-44" src={video.thumbnail} alt={video.title} />
      <div className="w-full p-4 text-white bg-black h-[70px] ">
      <img  className="h-[50px] w-[50px] rounded-full " src={video.owner.avatar}></img>
         <div className='relative flex flex-col flex-wrap mx-16 bottom-16 '>
       
        
        <h4>{video.title}</h4>
        <h3>{video.owner.username}</h3>
        </div>

     
      </div>
    </div>
    </Link>
  );
};
    

export default VideoCard;

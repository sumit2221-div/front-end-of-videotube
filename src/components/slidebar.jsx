import React, { useState } from 'react';

import { RxHamburgerMenu } from 'react-icons/rx';
import { FaHome } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BsFilePost } from "react-icons/bs";
import {  useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate()

  const slideitems = [
    {
      text: "Home",
      slug: "/",
      icon: <FaHome/>,
    },
    {
      text: "Tweets",
      slug: "/tweets",
      icon: <BsFilePost/>,
    },
    // Add more items here if needed
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  

  return (
    <>
    <div className={`sidebar h-full bg-gray-900 text-white absolute top-0 ${isOpen ? 'w-[150px]' : 'w-[50px]'} transition-all duration-300 ease-in-out`}>
      <button onClick={toggleSidebar} className="text-3xl text-white toggle-button">
        {isOpen ? <RxCross2/> : <RxHamburgerMenu/>} 
      </button>
      
      <div className="relative flex flex-col p-4 sidebar-content top-10">
        {/* Add your sidebar content here */}
        <ul className='flex flex-wrap gap-5'>
          {slideitems.map((item, index) => (
            <li key={index} className={`text-3xl ${item.slug === activeItem ? 'text-green-500' : 'text-white'}`} onClick={() =>navigate(item.slug)}>
              {item.icon}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaHome } from "react-icons/fa";


import { RxCross2 } from "react-icons/rx";
import { MdOutlineSubscriptions } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <button onClick={toggleSidebar} className="absolute top-0 left-0 px-2 py-4 text-2xl text-white toggle-button">
        {isOpen ? < RxCross2/>: <RxHamburgerMenu/>} 
      </button>
    <div className={`sidebar  h-full bg-gray-900 text-white absolute top-[50px]  ${isOpen ? 'w-[150px]' : 'w-[50px]'} transition-all duration-300 ease-in-out`}>
      
      <div className="relative p-4 sidebar-content top-10">
        {/* Add your sidebar content here */}
        <ul className='flex flex-col gap-5'>
          <li className="text-3xl"><FaHome/></li>
          <li className="text-2xl"><MdOutlineSubscriptions/></li>
          <li className="py-2">Link 3</li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default Sidebar;

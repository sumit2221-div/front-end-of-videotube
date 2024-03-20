import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';


import { RxCross2 } from "react-icons/rx";

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
      
      <div className="relative p-4 sidebar-content top-14">
        {/* Add your sidebar content here */}
        <ul>
          <li className="py-2">Link 1</li>
          <li className="py-2">Link 2</li>
          <li className="py-2">Link 3</li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import Header from './header';
import Sidebar from "./slidebar";

const Box = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap">
      <Sidebar onToggle={handleSidebarToggle} />
      <div className={`flex flex-col w-full transition-all duration-300 ${sidebarOpen ? 'lg:ml-[150px]' : ''}`}>
        <Header />
        <div className="flex-wrap flex-1 p-6 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Box;

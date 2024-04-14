// Box.jsx

import React from 'react';
import Header from './header';
import Sidebar from "./slidebar"

const Box = ({ children }) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex-wrap flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Box;

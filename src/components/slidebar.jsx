import React, { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaHome } from "react-icons/fa";
import { BsFilePost } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import { MdSubscriptions } from "react-icons/md";

const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/');
  const location = useLocation();
  const navigate = useNavigate();

  const slideitems = [
    {
      text: "Home",
      slug: "/",
      icon: <FaHome />,
    },
    {
      text: "Tweets",
      slug: "/tweets",
      icon: <BsFilePost />,
    },
    {
      text: "Subscription",
      slug: "/subscription",
      icon: <MdSubscriptions  />,
    }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  const handleItemClick = (slug) => {
    setActiveItem(slug);
    navigate(slug);
  };

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  return (
    <>
      <div className={`sidebar h-full bg-gray-900 text-white fixed top-0 left-0 ${isOpen ? 'w-[170px]' : 'w-[70px]'} transition-all duration-300 ease-in-out`}>
        <button onClick={toggleSidebar} className="text-3xl text-white toggle-button">
          {isOpen ? <RxHamburgerMenu /> : <RxHamburgerMenu />}
        </button>

        <div className="relative flex flex-col p-4 sidebar-content top-10">
          <ul className={`flex flex-col gap-5 ${isOpen ? 'mt-5' : 'mt-0'}`}>
            {slideitems.map((item, index) => (
              <li key={index} className={`text-3xl flex gap-6 items-center ${item.slug === activeItem ? 'text-blue-500 ' : 'text-white'}`} onClick={() => handleItemClick(item.slug)}>
                {item.icon}
                  
                {isOpen && <span className="text-xl ">{item.text}</span> }
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

import React, { useState, useEffect } from 'react';
import LOGO from "../assets/LGO.png";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './logout';
import { fetchCurrentUser } from '../api/userApi'; // Import centralized API function
import { MdVideoLibrary, MdOutlineWebAsset } from 'react-icons/md';
import { BiSearch } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [userAvatar, setUserAvatar] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownBoxOpen, setIsDropdownBoxOpen] = useState(false);

  const navItems = [
    {
      icon: <IoPerson />,
      text: "Login",
      slug: "/Login",
      active: !isLoggedIn,
    },
    {
      icon: <MdVideoLibrary />,
      text: "Publish Video",
      slug: "/PublishVideo",
      active: isLoggedIn,
    },
    {
      icon: <MdOutlineWebAsset />,
      text: "Tweet",
      slug: "/tweet",
      active: isLoggedIn
    }
  ];

  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        if (isLoggedIn) {
          const userData = await fetchCurrentUser(); // Use centralized API function
          setUserAvatar(userData);
        }
      } catch (error) {
        console.error('Error fetching user avatar:', error);
        setUserAvatar({ avatar: 'default-avatar.png' }); // Fallback avatar
      }
    };

    fetchUserAvatar();
  }, [isLoggedIn]);

  const handleGetUserChannel = () => {
    const userId = userAvatar._id;
    navigate(`/user/c/${userId}`);
  };

  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className='flex flex-wrap items-center justify-between w-auto px-4 py-4 mx-10 bg-gray-900 shadow-xl'>
      <div className='flex items-center'>
        <img src={LOGO} className='w-10 h-10 mr-2' alt="Logo" />
        <h1 className='text-xl font-semibold text-white'>Videotube</h1>
      </div>
      <form onSubmit={handleSearchSubmit} className='flex items-center'>
        <input
          type="search"
          value={query}
          onChange={handleSearchInputChange}
          className="block w-[400px] px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search videos..."
          required
        />
        <button type="submit" className="flex items-center justify-center w-10 h-10 ml-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" aria-label="Search">
          <BiSearch />
        </button>
      </form>
      <div className="flex items-center"> 
        {!isLoggedIn ? (
          <button onClick={() => navigate("/Login")} className="flex items-center px-4 py-2 text-sm text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <IoPerson className="mr-2" />
            Login to use more features
          </button>
        ) : (
          <button onClick={() => setIsDropdownBoxOpen(!isDropdownBoxOpen)} className="relative duration-300 outline-none cursor-pointer group hover:rotate-90" title="Add New" aria-expanded={isDropdownBoxOpen}>
            <svg className="duration-300 stroke-gray-300 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0" viewBox="0 0 24 24" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg">
              <path strokeWidth="1.5" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"></path>
              <path strokeWidth="1.5" d="M8 12H16"></path>
              <path strokeWidth="1.5" d="M12 16V8"></path>
            </svg>
          </button>
        )}
        {isLoggedIn && isDropdownBoxOpen && (
          <ul className="absolute top-[10%] right-[10%] z-10 mt-2 bg-gray-800 rounded-md shadow-lg">
            {navItems.map((item) => (
              item.active && (
                <li key={item.slug}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='block px-4 py-2 text-sm text-left text-white hover:bg-gray-700'
                  >
                    {item.text}
                  </button>
                </li>
              )
            ))}
          </ul>
        )}
      </div>
      {isLoggedIn && (
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='relative' aria-expanded={isDropdownOpen}>
            <img src={userAvatar.avatar || 'default-avatar.png'} className='w-8 h-8 rounded-full' alt="User Avatar" />
            <svg className="absolute top-0 right-0 w-4 h-4 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5 7l5 5 5-5z" />
            </svg>
          </button>
          {isDropdownOpen && (
            <ul className="absolute right-0 z-10 mt-2 bg-gray-800 rounded-md shadow-lg w-[150px]">
              <li>
                <button onClick={() => { handleGetUserChannel(); setIsDropdownOpen(false); }} className='block px-4 py-2 text-sm text-left text-white hover:bg-gray-700'>
                  View Channel
                </button>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;

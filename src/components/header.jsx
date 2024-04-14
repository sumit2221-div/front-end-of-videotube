import React, { useState, useEffect } from 'react';
import LOGO from "../assets/LGO.png";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from './logout';
import axios from 'axios';
import { MdVideoLibrary, MdHome, MdLogin , MdOutlineWebAsset} from 'react-icons/md';
const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const isLoggedIn = sessionStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [userAvatar, setUserAvatar] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility


  const navItems = [
    {
      icon: <MdLogin />,
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
      icon : <MdOutlineWebAsset/>,
      text : "text",
      slug : "/tweet",
      active : isLoggedIn
    }
  ];

  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        if (isLoggedIn) {
          const accessToken = sessionStorage.getItem('accessToken');
          const response = await axios.get('https://backend-of-videotube.onrender.com/api/v1/users/current-user', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          setUserAvatar(response.data.data);
          console.log("User fetched successfully");
          console.log(accessToken)
        }
      } catch (error) {
        console.error('Error fetching user avatar:', error);
      }
    };

    fetchUserAvatar();
  }, [isLoggedIn, sessionStorage.getItem('accessToken')]);

  const handleGetUserChannel = async () => {
    const username = userAvatar.username; // Assuming username is available in userAvatar
    navigate(`/user/c/${username}`);
  };

  
    const handleSearchInputChange = (event) => {
      setQuery(event.target.value);
    };
  
    const handleSearchSubmit = (event) => {
      event.preventDefault();
      onSearch(query);
    };
  
  return (
    <div className='flex flex-wrap items-center justify-between w-full px-4 py-4 bg-gray-900 shadow-xl '>
      <div className='flex items-center'>
        <img src={LOGO} className='w-10 h-10 mr-2' alt="Logo" />
        <h1 className='text-xl font-semibold text-white'>Videotube</h1>
      </div>
      <form onSubmit={handleSearchSubmit} className='flex items-center'>
        <input
          type="search"
          value={query}
          onChange={handleSearchInputChange}
          className="block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-md md:w-72 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search videos..."
          required
        />
        <button type="submit" className="px-4 py-2 ml-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Search</button>
      </form>
      <ul className='flex items-center space-x-5'>
        {navItems.map((item) =>
          item.active ? (
            <li key={item.text}>
              <button
                onClick={() => navigate(item.slug)}
                className='text-2xl text-white duration-200 hover:text-gray-300'
              >
                {item.icon}
              </button>
            </li>
          ) : null
        )}
        {isLoggedIn && (
          <li>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='relative'>
              <img src={userAvatar.avatar} className='w-8 h-8 rounded-full' alt="User Avatar" />
              {/* Dropdown arrow */}
              <svg className="absolute top-0 right-0 w-4 h-4 -mt-1 -mr-1 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 7l5 5 5-5z" /></svg>
            </button>
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 w-48 py-1 mt-2 bg-gray-800 rounded-md shadow-lg ">
                <button onClick={() => { handleGetUserChannel(); setIsDropdownOpen(false); }} className='block w-full px-4 py-2 text-sm text-left text-white hover:bg-gray-700'>View Channel</button>
                <LogoutButton />
              </div>
            )}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Header;

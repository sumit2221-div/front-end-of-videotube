import React, { useState } from 'react';
import LOGO from "../assets/LGO.png";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from './logout';
import { useEffect } from 'react';
import axios from 'axios';
import { MdVideoLibrary, MdHome, MdLogin } from 'react-icons/md';

function Header() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [useravatar, setUserAvatar] = useState('');
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
    
  ];

  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        if (isLoggedIn) {
          const accessToken = localStorage.getItem('accessToken');
          const response = await axios.get('http://localhost:4000/api/v1/users/current-user', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          setUserAvatar(response.data.data);
          console.log("User fetched successfully");
        }
      } catch (error) {
        console.error('Error fetching user avatar:', error);
      }
    };

    fetchUserAvatar();
  }, [isLoggedIn, localStorage.getItem('accessToken')]);

  const handleGetUserChannel = async () => {
   
    const username = useravatar.username; // Assuming username is available in useravatar
    navigate(`/user/c/${username}`);
  };


  return (
    <div className='h-[50px] w-full absolute bg-gray-900 box-shadow-xl shadow-white top-0'>
      <img src={LOGO} className='h-[60px] w-[100px] relative left-7 bg-transparent' />
      <h1 className='absolute text-2xl text-white left-[8%] top-5 font-sans'>Videotube</h1>
      <div className='w-[400px] absolute top-3 left-[30%] flex gap-3'>
        <input type="search" id="default-search" className="block w-[300px] p-2 rounded-xl ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search videos......" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>

      <ul className='h-[50px] w-[100px] bg-transparent absolute top-0 left-[80%] rounded-xl text-center flex gap-5'>
        {navItems.map((item) =>
          item.active ? (
            <li key={item.text}>
              <button
                onClick={() => navigate(item.slug)}
                className='relative py-4 text-3xl text-white duration-200 rounded-full left-28 px-11 inline-bock hover:text-slate-300'
              >
                {item.icon}
              </button>
            </li>
          ) : null
        )}
        {isLoggedIn && (
          <li>
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='h-[40px] w-[40px] rounded-full relative top-3 left-32'>
                <img src={useravatar.avatar} className='rounded-full h-[40px] w-[40px]' />
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="h-[200px] w-[150px] bg-slate-900 rounded-xl text-white top-2 absolute flex flex-col gap-5 left-1 right-0">
                <button onClick={() => {
  handleGetUserChannel();
  setIsDropdownOpen(false);
}} className='text-white'>
  view channel
</button>
                  
                  <LogoutButton />
                </div>
              )}
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Header;

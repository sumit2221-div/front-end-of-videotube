import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Registration from './components/Registration';
import Login from './components/login.jsx';
import Home from "./components/home"
import PublishVideo from "./components/publishVideo.jsx";

import { useSelector } from 'react-redux';
import UserChannelPage from './components/Userchannel.jsx';
import VideoPlayer from './components/playvideo.jsx';
import Box from './components/box.jsx';
import CreateTweet from './components/tweet.jsx';
import Tweets from "./components/tweets"

const App = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn) || localStorage.getItem('accessToken');

  useEffect(() => {
    // Check if access token is expired
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const accessTokenData = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        if (accessTokenData.exp < currentTime) {
          // Token is expired, clear local storage and redirect to login
          localStorage.removeItem('accessToken');
        }
      } catch (error) {
        console.error('Error decoding access token:', error);
        // Handle decoding error (e.g., token is malformed)
      }
    }
  }, []);

  return (
    <div>
      <Box>
        <Routes>
          <Route path="/" element={!isLoggedIn ? <Login /> : <Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path='/PublishVideo' element={<PublishVideo />} />
          
          <Route path="/user/c/:username" element={<UserChannelPage />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path='/tweet' element={<CreateTweet />} />
          <Route path='/tweets' element={<Tweets />} />
        </Routes>
      </Box>
    </div>
  );
};

export default App;

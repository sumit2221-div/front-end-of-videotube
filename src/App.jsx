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

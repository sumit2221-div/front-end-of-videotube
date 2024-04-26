import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Registration } from './components/registation/Registration.jsx';
import Login from './components/login.jsx';
import Home from "./components/home"
import PublishVideo from "./components/publishVideo.jsx";

import { useSelector } from 'react-redux';
import UserChannelPage from './components/Userchannel.jsx';
import VideoPlayer from './components/playvideo.jsx';
import Box from './components/box.jsx';
import CreateTweet from './components/tweet.jsx';
import Tweets from "./components/tweets"
import Changepassword from './components/changepassword.jsx';
import SubscriptionVideos from './components/subscription.jsx';

const App = () => {
  
  const accessToken = useSelector(state => state.auth.isLoggedIn)|| sessionStorage.getItem('accessToken');

  return (
    <div>
      <Box>
        <Routes>
        
          <Route path="/" element={accessToken ? <Home /> : <Login/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path='/PublishVideo' element={<PublishVideo />} />
          
          <Route path="/user/c/:username" element={<UserChannelPage />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path='/tweet' element={<CreateTweet />} />
          <Route path='/tweets' element={<Tweets />} />
          <Route path='/change' element={<Changepassword/>}/>
          <Route path="/subscription" element={<SubscriptionVideos/>}/>
        </Routes>
      </Box>
    </div>
  );
};

export default App;

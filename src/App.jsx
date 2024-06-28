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
        
          <Route path="/" element={<Home/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path='/PublishVideo' element={accessToken ? <PublishVideo/> : <Login/>}/>
          
          <Route path="/user/c/:userId" element={accessToken ? <UserChannelPage /> : <Login/>} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path='/tweet' element={accessToken ? <CreateTweet/> : <Login/>} />
          <Route path='/tweets' element={<Tweets />} />
          <Route path='/change' element={<Changepassword/>}/>
          <Route path="/subscription" element={accessToken ? <SubscriptionVideos/> : <Login/>}/>
        </Routes>
      </Box>
    </div>
  );
};

export default App;
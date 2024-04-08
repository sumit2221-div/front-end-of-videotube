import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Registration from './components/Registration';
import Header from './components/header';
import Sidebar from './components/slidebar';
import Login from './components/login';
import Home from './components/home';
import PublishVideo from './components/publishVideo';
import Profile from './components/getcurrentuser';
import {  useSelector } from 'react-redux';
import UserChannelPage from './components/Userchannel';
import VideoPlayer from './components/playvideo';



const App= () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  
  return (
    <div>
        <Header/>
      <Sidebar/>
    
    
      <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/Login" element={< Login/>} />
        <Route path="/Registration" element={<Registration />} />
        <Route path='/PublishVideo' element={<PublishVideo/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path="/user/c/:username" element={<UserChannelPage />} />
        <Route path="/video/:id" element={<VideoPlayer/>} />

        
        

      </Routes>
    
    </div>
  );
};
export default App
import React from 'react'
import Header from './components/header'
import Sidebar from './components/slidebar'

function App() {
  return (
    <div>
      <Header/>
      <outlet/>
      <Sidebar/>
      
    </div>
  )
}

export default App

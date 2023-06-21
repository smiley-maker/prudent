import React from 'react';
import "./Home.css";
import Sidebar from '../components/Sidebar/Sidebar';

function Home() {
  return (
    <div className='home'>
      <Sidebar />
      <div className="home-container">
        <h1>Home</h1>
      </div>
    </div>
  )
}

export default Home;

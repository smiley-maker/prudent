import React from 'react';
import "./Home.css";
import Sidebar from '../components/Sidebar/Sidebar';
import TodoCard from '../components/todoCard/TodoCard';
import Conferences from '../components/Conferences';

function Home() {
  return (
    <div className='home'>
      <Sidebar />
      <div className="home-container">
        <h1>Home</h1>
        <div className="dashboard">
          <TodoCard />
          <Conferences />
        </div>
      </div>
    </div>
  )
}

export default Home;

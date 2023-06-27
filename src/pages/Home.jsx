import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import { db } from '../firestore';
import { doc, getDoc } from 'firebase/firestore';
import "./Home.css";
import Sidebar from '../components/Sidebar/Sidebar';
import TodoCard from '../components/todoCard/TodoCard';
import Conferences from '../components/Conferences';
import ProgressCard from '../components/ProgressCard/ProgressCard.jsx';

async function getUserData(uid) {
  const userRef = doc(db, 'users', uid);

  try {
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
}

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData(currentUser.uid);
      console.log(userData);
      setUserInfo(userData);
    };

    fetchUserData(); 
  }, [currentUser]);

  return (
    <div className='home'>
      <Sidebar />
      <div className="home-container">
        {userInfo && (
          <>
          <h1 className='home-heading' >Welcome back, {userInfo.name.split(' ')[0]}!</h1>
          </>
        )}
        <div className="dashboard">
          <TodoCard />
          <Conferences />
          <Conferences />
          <Conferences />
          <ProgressCard />

          <Conferences />
          <Conferences />
        </div>
      </div>
    </div>
  )
}

export default Home;

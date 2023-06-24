import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firestore';
import { doc, getDoc } from 'firebase/firestore';
import Logout from '../Logout/Logout';
import "./usercard.css";

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

function UserCard() {
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
    <div className='user-card'>
      {userInfo && (
        <>
          <img src={userInfo.img} alt={userInfo.name} className="profile-img" />
          <h3 className='user-name'>{userInfo.name}</h3>
          <Logout />

          {/* Render the user profile picture or other information */}
        </>
      )}
    </div>
  );
}

export default UserCard;

import React, { useContext } from 'react';
import "./logout.css";
import { signOut } from 'firebase/auth';
import { auth } from '../../firestore';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Logout() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const logUserOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      })
      .catch(error => {
        console.error("Error logging out:", error);
      });
  }

  return (
    <button className="logout" onClick={logUserOut}>
      logout
    </button>
  )
}

export default Logout;

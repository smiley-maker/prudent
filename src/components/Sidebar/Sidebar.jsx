import React, { useState } from 'react';
import "./sidebar.css";
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai"
import UserCard from '../UserCard/UserCard';
import Logo from "../../images/cc logo.svg";

function Sidebar() {
  return (
    <div className='sidebar-container'>

      <nav className='nav-menu'>
        <img src={Logo} alt="conference collective logo" className="logo" />
        <ul className="nav-menu-items">
          <li className="navbar-link">
            <Link to="/">
              <MdIcons.MdSpaceDashboard className='icon' />
              <span className='nav-text'>dashboard</span>
            </Link>
          </li>
          <li className="navbar-link">
            <Link to="/todos">
              <AiIcons.AiFillCheckCircle className='icon' />
              <span className='nav-text'>todo</span>
            </Link>
          </li>
          <li className="navbar-link">
            <Link to="/allConfs">
              <MdIcons.MdSchool className='icon'/>
              <span className='nav-text'>conferences</span>
            </Link>
          </li>
          <li className="navbar-link">
            <Link to="/favorites">
              <MdIcons.MdFavorite className='icon' />
              <span className="nav-text">favorites</span>
            </Link>
          </li>
        </ul>
        <UserCard />
      </nav>
    </div>
  )
}

export default Sidebar;

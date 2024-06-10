import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './SideBar.css'
import useWindowSize from '../utils/UseWindowSize';

const Sidebar = ({closeSidebar, hasNotifications}) => {
  const { width } = useWindowSize();
  const [activeIndex, setActiveIndex] = useState();

  const handleItemClick = (index) => {
    setActiveIndex(index);
    if(width <= 868){
      closeSidebar(); 
    }
}

  return (
    <div className="sidebar">
      <ul>
        <li className={`item flex ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleItemClick(0)}>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </li>
        <li className={`item flex ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleItemClick(1)}>
          <NavLink to='/reportbug'>Report a Bug</NavLink>
        </li>
        <li className={`item flex ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleItemClick(2)}>
          <NavLink to='/myreports'>My Reports</NavLink>
        </li>
        <li className={`item flex ${activeIndex === 3 ? 'active' : ''}`} onClick={() => handleItemClick(3)}>
          <NavLink to='/profile'>Profile</NavLink>
        </li>
        <li className={`item flex ${activeIndex === 4 ? 'active' : ''}`} onClick={() => handleItemClick(4)}>
          <NavLink to='/forum'>Forum {hasNotifications && <span className="red-badge"/>}</NavLink>
        </li>
        <li className={`item flex ${activeIndex === 5 ? 'active' : ''}`} onClick={() => handleItemClick(5)}>
          <NavLink to='/notifications'>Notifications</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar

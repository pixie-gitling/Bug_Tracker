import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './AdminSidebar.css'
import useWindowSize from '../utils/UseWindowSize';

const TesterSidebar = ({closeSidebar, hasNotifications}) => {

  const [activeIndex, setActiveIndex] = useState();

  const handleItemClick = (index) => {
    setActiveIndex(index);
    if(useWindowSize <= 868){
      closeSidebar(); 
    }
  }

  return (
    <div className="Sidebar">
      <ul>
        <li className={`Item flex ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleItemClick(0)}>
          <NavLink to='/testerdashboard'>Dashboard</NavLink>
        </li>
        <li className={`Item flex ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleItemClick(1)}>
          <NavLink to='/assignedbugs'>Assigned Reports</NavLink>
        </li>
        <li className={`Item flex ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleItemClick(2)}>
          <NavLink to='/testerprofile'>Profile</NavLink>
        </li>
        <li className={`Item flex ${activeIndex === 3 ? 'active' : ''}`} onClick={() => handleItemClick(3)}>
          <NavLink to='/tester/forum'>Forum {hasNotifications && <span className="red-badge"/>}</NavLink>
        </li>
        <li className={`Item flex ${activeIndex === 4 ? 'active' : ''}`} onClick={() => handleItemClick(4)}>
          <NavLink to='/tester/notifications'>Notifications</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default TesterSidebar;
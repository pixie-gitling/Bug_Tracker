import React from 'react'
import { NavLink } from 'react-router-dom'
import '../admin/AdminSidebar.css'

const TesterSidebar = () => {
  return (
    <div className="Sidebar">
      <div className="Item flex">
        <NavLink to='/testerdashboard'>Dashboard</NavLink>
      </div>
      <div className='Item flex'>
        <NavLink to='/assignedbugs'>Assigned Bugs</NavLink>
      </div>
      <div className='Item flex'>
        <NavLink to='/testerprofile'>Profile</NavLink>
      </div>
      <div className='Item flex'>
        <NavLink to='/forum'>Forum</NavLink>
      </div>
    </div>
  )
}

export default TesterSidebar
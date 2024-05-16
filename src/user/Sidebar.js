import React from 'react'
import { NavLink } from 'react-router-dom'
import './SideBar.css'

const Sidebar = () => {
  return (
    <div className="containerr">
        <div className="sidebar">
          <div className="item flex">
            <NavLink to='/dashboard'>Dashboard</NavLink>
          </div>
          <div className='item flex'>
            <NavLink to='/reportbug'>Report a Bug</NavLink>
          </div>
          <div className='item flex'>
            <NavLink to='/myreports'>My Reports</NavLink>
          </div>
          <div className='item flex'>
            <NavLink to='/profile'>Profile</NavLink>
          </div>
          <div className='item flex'>
            <NavLink to='/forum'>Forum</NavLink>
          </div>
        </div>
      </div>
  )
}

export default Sidebar
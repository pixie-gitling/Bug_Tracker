import React from 'react'
import { NavLink } from 'react-router-dom'
import './AdminSidebar.css'

const AdminSidebar = () => {
  return (
    <div className="Sidebar">
      <div className="Item flex">
        <NavLink to='/admindashboard'>Dashboard</NavLink>
      </div>
      <div className='Item flex'>
        <NavLink to='/reports'>Bug Reports</NavLink>
      </div>
      <div className='Item flex'>
        <NavLink to='/users'>Users</NavLink>
      </div>
      <div className='Item flex'>
        <NavLink to='/adminprofile'>Profile</NavLink>
      </div>
      <div className='Item flex'>
        <NavLink to='/forum'>Forum</NavLink>
      </div>
    </div>
  )
}

export default AdminSidebar
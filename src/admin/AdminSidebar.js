import React from 'react'
import { NavLink } from 'react-router-dom'
import '../user/SideBar.css'

const AdminSidebar = () => {
  return (
    <div className="container">
        <div className="sidebar">
          <div className="item flex">
            <NavLink to='/AdminDashboard'>Dashboard</NavLink>
          </div>
          <div className='item flex'>
            <NavLink to='/reports'>Bug Reports</NavLink>
          </div>
          <div className='item flex'>
            <NavLink to='/users'>Users</NavLink>
          </div>
          <div className='item flex'>
            <NavLink to='/forum'>Forum</NavLink>
          </div>
        </div>
      </div>
  )
}

export default AdminSidebar
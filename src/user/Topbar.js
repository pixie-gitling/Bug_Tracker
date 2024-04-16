import React, { useContext } from 'react'
import './Topbar.css'
import { useNavigate } from 'react-router'
// import { UserContext } from '../context/UserContext'

const Topbar = ({onLogout}) => {

  const navigate = useNavigate()
  // const { user } = useContext(UserContext)

  const handleLogout = () => {
    onLogout()
    navigate("/")
  }

  const handleUser = () => {
    navigate("/profile")
  }

  return (
    <div className="topbar flex">
        <div className="logo">
          <h1>Bug Tracker</h1>
        </div>
        <div className="user">
          <button className='user-profile' onClick={handleUser}>User</button>
        </div>
        <div className='logout'>
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
      </div>
  )
}

export default Topbar
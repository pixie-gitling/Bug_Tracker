import React, { useState, useEffect } from 'react';
import './Topbar.css';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Topbar = ({ onLogout }) => {
  const [user, setUser] = useState('');
  const [profile, setProfile] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${Cookies.get('userId')}`);
        setUser(response.data.name);
        setProfile(response.data.image);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    }
    Cookies.remove('userId');
    navigate("/");
  };

  const handleUser = () => {
    navigate("/profile");
  };

  return (
    <div className="UserTopbar flex">
      <div className="logo flex">
        <img src='icon.png' />
        <h1>Bug Tracker</h1>
      </div>
      <div className="user">
        <button className='user-profile' onClick={handleUser}>{user}</button>
      </div> 
      <div className='profile flex'> 
        <button className='user-profile' onClick={handleUser}>
        {profile && (
          <img src={profile} alt='Profile' className='user-profile-image' />
        )}
        </button>
      </div>
      <div className='logout'>
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
import React, { useState, useEffect } from 'react';
import './Topbar.css';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const ResTopbar = ({ onLogout, toggleSidebarOnButtonClick }) => {
  const [profile, setProfile] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = Cookies.get('userId');
        const response = await axios.get(`/users/${userId}}`);
        setProfile(response.data.image);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    onLogout();
    Cookies.remove('userId');
    navigate("/");
    setShowOptions(false);
  };

  const handleUser = () => {
    navigate("/profile");
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="UserTopbar flex">
        <div className='menu' onClick={toggleSidebarOnButtonClick}>
            <FontAwesomeIcon icon='bars' className='icon1'/>
        </div>
      <div className="logo1 flex">
        <img src='icon.png' />
        <h1>Bug Tracker</h1>
      </div>
      <div className='Profile'>
          {profile && (
              <img src={profile} alt='Profile' className='user-profile-image' />
          )}
        <button className='user-profile' onClick={toggleOptions}>
          <FontAwesomeIcon icon={faAngleDown} className='icon'/>
        </button>
        {showOptions && (
          <div className='options flex'>
            <button className='option user-profile' onClick={handleUser}>User Profile</button> 
            <button className='option user-profile' onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResTopbar;
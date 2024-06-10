import React, { useState, useEffect } from 'react';
import '../admin/AdminTopbar.css';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const ResponsiveTopbar = ({ onLogout, ShowSidebar }) => {
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
    <div className="Topbar flex">
        <div className='Menu' onClick={ShowSidebar}>
            <FontAwesomeIcon icon='bars' className='Icon1'/>
        </div>
      <div className="Logo1 flex">
        <img src='icon.png' />
        <h1>Bug Tracker</h1>
      </div>
      <div className='Profile'>
          {profile && (
              <img src={profile} alt='Profile' className='user-profile-image' />
          )}
        <button className='user-profile' onClick={toggleOptions}>
          <FontAwesomeIcon icon={faAngleDown} className='Icon'/>
        </button>
        {showOptions && (
          <div className='Options flex'>
            <button className='Option user-profile' onClick={handleUser}>User Profile</button> 
            <button className='Option user-profile' onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsiveTopbar;
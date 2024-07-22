import React, { useState, useEffect } from 'react';
import './Topbar.css';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import useWindowSize from '../utils/UseWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ResTopbar = ({ onLogout, toggleSidebarOnButtonClick }) => {
  const [profile, setProfile] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowSize();

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
     
        <div className='menu flex' onClick={toggleSidebarOnButtonClick}>
            <FontAwesomeIcon icon='bars' className='icon1'/>
        </div>
      <div className="logo1 flex">
        <img src='icon.png' />
        <h1 className={ width < 470 ? "hide" : ""}>Bug Tracker</h1>
      </div>
      <div className='log flex'>
          {profile && (
              <img src={profile} alt='Profile' className='user-profile-image' />
          )}
        <button className='user-profile' onClick={handleLogout}>Logout</button>
      </div>
      </div>
   
  );
};

export default ResTopbar;
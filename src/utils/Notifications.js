import React, { useEffect, useState } from 'react'
import './Notifications.css'
import axios from 'axios';
import Cookies from 'js-cookie'

const Notifications = ({colorScheme}) => {

  const [notifications, setNotifications] = useState([]);
  const username = Cookies.get('username')

  useEffect(() => {
    axios.get(`/notification/notifications?username=${username}`)
    .then(res => setNotifications(res.data))
    .catch(err => console.error(err));
  }, [username]);

  const formatTime = (timeString) => {
    const options = { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
    };
    return new Date(timeString).toLocaleString('en-GB', options);
  };

  return (
    <div className='Notifications'>
      <div className='heading flex'>
        <h1>Notifications</h1>
      </div>
      <div className='notification'>
        {notifications.map( notification => (
          <div key={notification.time} className={`notify ${colorScheme}`}>
            <h3>{notification.message}</h3>
            <p>{formatTime(notification.time)}</p>
            <button className={`history-btn ${colorScheme}`} onClick={() => window.location.href = notification.redirect}>View</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notifications;
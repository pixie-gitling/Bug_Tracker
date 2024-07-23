import React, { useState } from 'react';
import AdminTopbar from './AdminTopbar';
import AdminSidebar from './AdminSidebar';
import useWindowSize from '../utils/UseWindowSize';
import ResponsiveTopbar from './ResponsiveTopbar';

const AdminLayout = ({ onLogout, children, hasNotifications }) => {

  const { width } = useWindowSize();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleSidebarOnButtonClick = () => {
    if (width <= 868) {
      toggleSidebar();
    }
  };
  
  return (
    <div className="adminLayout">
      <div className="adminTopbar">
        {width > 867 ? (<AdminTopbar onLogout={onLogout}/>) : (<ResponsiveTopbar onLogout={onLogout} toggleSidebarOnButtonClick={toggleSidebarOnButtonClick}/>)}
      </div>
      <div className="Admin flex">
        <div className="adminSidebar">
          {width > 867 ? (<AdminSidebar hasNotifications={hasNotifications}/>) : (<AdminSidebar closeSidebar={toggleSidebar} hasNotifications={hasNotifications}/>)}
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
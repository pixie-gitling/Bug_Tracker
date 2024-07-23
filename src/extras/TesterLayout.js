import React, { useState } from 'react';
import AdminTopbar from './AdminTopbar';
import TesterSidebar from './TesterSidebar';
import useWindowSize from '../utils/UseWindowSize';
// import ResponsiveTopbar from './ResponsiveTopbar';

const TesterLayout = ({ onLogout, children, hasNotifications }) => {

  const width = useWindowSize();
  const [showSidebar, setShowSidebar] = useState();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  // const toggleSidebarOnButtonClick = () => {
  //   if(width <= 867) {
  //     toggleSidebar();
  //   }
  // }
  
  return (
    <div className="adminLayout">
      <div className="adminTopbar">
        <AdminTopbar onLogout={onLogout}/>
        {/* { width > 867 ? (<AdminTopbar onLogout={onLogout}/>) : (<ResponsiveTopbar onLogout={onLogout} toggleSidebarOnButtonClick={toggleSidebarOnButtonClick}/>) } */}
      </div>
      <div className="Admin flex">
        <div className="adminSidebar">
          { width > 867 ? (<TesterSidebar hasNotifications = {hasNotifications}/>) : (<TesterSidebar closeSidebar={toggleSidebar} hasNotifications = {hasNotifications}/>)}
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default TesterLayout;
import React from 'react';
import AdminTopbar from '../admin/AdminTopbar';
import TesterSidebar from './TesterSidebar';

const TesterLayout = ({ onLogout, children }) => {
  
  return (
    <div className="adminLayout">
      <div className="adminTopbar">
        <AdminTopbar onLogout={onLogout}/>
      </div>
      <div className="Admin">
        <div className="adminSidebar">
          <TesterSidebar />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default TesterLayout;
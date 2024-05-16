import React from 'react';
import AdminTopbar from './AdminTopbar';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ onLogout, children }) => {
  
  return (
    <div className="adminLayout">
      <div className="adminTopbar">
        <AdminTopbar onLogout={onLogout}/>
      </div>
      <div className="Admin">
        <div className="adminSidebar">
          <AdminSidebar />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
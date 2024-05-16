import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie"; 
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { Home } from "../utils/Home";

import Topbar from "../user/Topbar";
import Sidebar from "../user/Sidebar";
import Dashboard from "../user/Dashboard";
import { ReportBug } from "../user/ReportBug";
import DisplayReports from "../user/DisplayReports";
import Forum from "../user/Forum";
import UserProfile from "../user/UserProfile";

import AdminDashboard from "../admin/AdminDashboard";
import { Admin } from "../admin/Admin";
import AdminDisplayReports from "../admin/AdminDisplayReports";
import AdminLayout from "../admin/AdminLayout";
import AdminDisplayUsers from "../admin/AdminDisplayUsers";

import TesterLayout from "../tester/TesterLayout";
import TesterDashboard from "../tester/TesterDashboard";
import AssignedBugs from "../tester/AssignedBugs";
import BugDetails from "../admin/Bug";
import History from "../admin/History";
import BugHistory from "../admin/History";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

library.add(fas)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const storedLoginStatus = Cookies.get("isLoggedIn");
  const storedIsAdmin = Cookies.get("isAdmin");
  useEffect(() => {
    setIsLoggedIn(storedLoginStatus === "true");
    setIsAdmin(storedIsAdmin === "true");
  }, []);

  const handleLogin = (isAdminLogin) => { 
    setIsLoggedIn(true);
    setIsAdmin(!!isAdminLogin); 
    Cookies.set("isLoggedIn", "true", { expires: 7 });
    Cookies.set("isAdmin", (!!isAdminLogin).toString(), { expires: 7 });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    Cookies.remove("isLoggedIn");
    Cookies.remove("isAdmin");
  };

  return (
    <div className="parent">
      <BrowserRouter>
        {isLoggedIn && !isAdmin && <Topbar onLogout={handleLogout} />}
        {isLoggedIn && isAdmin && <AdminLayout onLogout={handleLogout} />}
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <div className="box">
          {isLoggedIn && !isAdmin && <Sidebar />} 
          <Routes>
            <Route path="/" element={storedLoginStatus ? <Navigate to="/dashboard" /> : <Home onLogin={handleLogin} />} />
            <Route path="/dashboard" element={storedLoginStatus ? <Dashboard /> : <Home onLogin={handleLogin} />} />
            <Route path="/reportbug" element={storedLoginStatus ? <ReportBug /> : <Home onLogin={handleLogin} />} />
            <Route path="/myreports" element={storedLoginStatus ? <DisplayReports /> : <Home onLogin={handleLogin} />} />
            <Route path="/forum" element={storedLoginStatus ? <Forum /> : <Home onLogin={handleLogin} />} />
            <Route path="/profile" element={storedLoginStatus ? <UserProfile /> : <Home onLogin={handleLogin} />} />


            <Route path="/adminlogin" element={<Admin onLogin={() => handleLogin(true)} />} />
            <Route path="/admindashboard" element={<AdminLayout onLogout={handleLogout}><AdminDashboard /></AdminLayout>} />
            <Route path="/reports" element={<AdminLayout onLogout={handleLogout}><AdminDisplayReports /></AdminLayout>} />
            <Route path="/bug/:reportId" element={<AdminLayout onLogout={handleLogout}><BugDetails /></AdminLayout>} />
            <Route path="/bug/:reportId/history" element={<AdminLayout onLogout={handleLogout}><BugHistory /></AdminLayout>} />
            <Route path="/users" element={<AdminLayout onLogout={handleLogout}><AdminDisplayUsers /></AdminLayout>} />
            <Route path="/adminprofile" element={<AdminLayout onLogout={handleLogout}><UserProfile /></AdminLayout>} />

            <Route path="/testerdashboard" element={<TesterLayout onLogout={handleLogout}><TesterDashboard /></TesterLayout>} />
            <Route path="/assignedbugs" element={<TesterLayout onLogout={handleLogout}><AssignedBugs /></TesterLayout>} />
            <Route path="/testerprofile" element={<TesterLayout onLogout={handleLogout}><UserProfile /></TesterLayout>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
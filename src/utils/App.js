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
import BugHistory from "../user/BugHistory";
import History from "../admin/History";
import Details from "../user/BugDetails";
import ResTopbar from "../user/ResTopbar";
import useWindowSize from "./UseWindowSize";
import Chat from "../admin/Chat";
import Notifications from "./Notifications";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

library.add(fas)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSessionTimeoutPopup, setShowSessionTimeoutPopup] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  let sessionTimeoutTimer;
  
  const handleLogin = (isAdminLogin) => { 
    setIsLoggedIn(true);
    setIsAdmin(!!isAdminLogin); 
    setSessionTimeout();
    Cookies.set("isLoggedIn", "true", { expires: 1/24 });
    Cookies.set("isAdmin", (!!isAdminLogin).toString(), { expires: 1/24 });
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    clearInterval(sessionTimeoutTimer);
    setShowSessionTimeoutPopup(false);
    Cookies.remove("isLoggedIn");
    Cookies.remove("isAdmin")
  };
  
  const storedLoginStatus = Cookies.get("isLoggedIn");
  const storedIsAdmin = Cookies.get("isAdmin");

  useEffect(() => {
    setIsLoggedIn(storedLoginStatus === "true");
    setIsAdmin(storedIsAdmin === "true");
    if(storedLoginStatus === "true"){
      setSessionTimeout();
    }
  }, []);

  const setSessionTimeout = () => {
    const sessionTimeoutDuration = 60*60*1000;
    const sessionTimeoutTimer = setTimeout(() => {
      setShowSessionTimeoutPopup(true);
    }, sessionTimeoutDuration);
  }

  const resetSessionTimeout = () => {
    clearTimeout(sessionTimeoutTimer);
    setSessionTimeout();
  }

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
    <div className="parent">
      {/* Popup for session timeout
      {showSessionTimeoutPopup && (
        <div className="session-timeout-popup">
          <div className="session-timeout-content">
            <h2>Session Timeout</h2>
            <p>Your session has timed out. Please login again.</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )} */}
      <BrowserRouter>
      {(isLoggedIn && !isAdmin && width > 867 && <Topbar onLogout={handleLogout} />) || (isLoggedIn && !isAdmin && width <= 867 && <ResTopbar onLogout={handleLogout} toggleSidebarOnButtonClick={toggleSidebarOnButtonClick} />)}
        {isLoggedIn && isAdmin && <AdminLayout onLogout={handleLogout} hasNotifications = {hasNotifications} />}
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <div className="box">
          {((isLoggedIn && !isAdmin && width >= 867) && <Sidebar hasNotifications = {hasNotifications} />) || ((isLoggedIn && !isAdmin && width < 868 && showSidebar) && <Sidebar closeSidebar={toggleSidebar} hasNotifications = {hasNotifications}/>)} 
          <Routes>
            <Route path="/" element={storedLoginStatus ? <Navigate to="/dashboard" /> : <Home onLogin={handleLogin} />} />
            <Route path="/dashboard" element={storedLoginStatus ? <Dashboard /> : <Home onLogin={handleLogin} />} />
            <Route path="/reportbug" element={storedLoginStatus ? <ReportBug /> : <Home onLogin={handleLogin} />} />
            <Route path="/myreports" element={storedLoginStatus ? <DisplayReports /> : <Home onLogin={handleLogin} />} />
            <Route path="/bug/:reportId/details" element={storedLoginStatus ? <Details /> : <Home onLogin={handleLogin} />} />
            <Route path="/bug/:reportId/reporthistory" element={storedLoginStatus ? <BugHistory /> : <Home onLogin={handleLogin} />} />
            <Route path="/forum" element={storedLoginStatus ? <Forum setHasNotifications = {setHasNotifications} colorScheme = "user" role="user"/> : <Home onLogin={handleLogin} />} />
            <Route path="/profile" element={storedLoginStatus ? <UserProfile colorScheme = "user" /> : <Home onLogin={handleLogin} />} />
            <Route path="/notifications" element={storedLoginStatus ? <Notifications colorScheme="user"/> : <Home onLogin={handleLogin} />} />

            <Route path="/adminlogin" element={<Admin onLogin={() => handleLogin(true)} />} />
            <Route path="/admindashboard" element={<AdminLayout onLogout={handleLogout}><AdminDashboard /></AdminLayout>} />
            <Route path="/reports" element={<AdminLayout onLogout={handleLogout}><AdminDisplayReports /></AdminLayout>} />
            <Route path="/bug/:reportId" element={<AdminLayout onLogout={handleLogout}><BugDetails role="admin"/></AdminLayout>} />
            <Route path="/bug/:reportId/chat" element={<AdminLayout onLogout={handleLogout}><Chat role="admin"/></AdminLayout>} />
            <Route path="/bug/:reportId/history" element={<AdminLayout onLogout={handleLogout}><History /></AdminLayout>} />
            <Route path="/users" element={<AdminLayout onLogout={handleLogout}><AdminDisplayUsers /></AdminLayout>} />
            <Route path="/adminprofile" element={<AdminLayout onLogout={handleLogout}><UserProfile colorScheme = "admin"  /></AdminLayout>} />
            <Route path="/admin/forum" element={<AdminLayout onLogout={handleLogout}><Forum setHasNotifications = {setHasNotifications} colorScheme = "admin" role="admin"/></AdminLayout>} />
            <Route path="/admin/notifications" element={<AdminLayout onLogout={handleLogout}><Notifications colorScheme="admin"/></AdminLayout>} />

            <Route path="/testerdashboard" element={<TesterLayout hasNotifications={hasNotifications} onLogout={handleLogout}><TesterDashboard /></TesterLayout>} />
            <Route path="/assignedbugs" element={<TesterLayout onLogout={handleLogout}><AssignedBugs /></TesterLayout>} />
            <Route path="/assignedbugs/:reportId" element={<TesterLayout onLogout={handleLogout}><BugDetails role="tester"/></TesterLayout>} />
            <Route path="/bug/:reportId/testerchat" element={<TesterLayout onLogout={handleLogout}><Chat role="tester"/></TesterLayout>} />
            <Route path="/bug/:reportId/testerhistory" element={<TesterLayout onLogout={handleLogout}><History /></TesterLayout>} />
            <Route path="/testerprofile" element={<TesterLayout onLogout={handleLogout}><UserProfile colorScheme="admin"/></TesterLayout>} />
            <Route path="/tester/forum" element={<TesterLayout hasNotifications={hasNotifications} onLogout={handleLogout}><Forum setHasNotifications = {setHasNotifications} role="tester"/></TesterLayout>} />
            <Route path="/tester/notifications" element={<TesterLayout onLogout={handleLogout}><Notifications colorScheme="admin"/></TesterLayout>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
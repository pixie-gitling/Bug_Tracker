import React, { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie"; 
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { Home } from "../utils/Home";

import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Dashboard from "../user/Dashboard";
import { ReportBug } from "../user/ReportBug";
import DisplayReports from "../user/DisplayReports";
import Forum from "./Forum";
import UserProfile from "../user/UserProfile";

import AdminDashboard from "../admin/AdminDashboard";
import AdminDisplayReports from "../admin/AdminDisplayReports";
import AdminLayout from "../extras/AdminLayout";
import AdminDisplayUsers from "../admin/AdminDisplayUsers";

import TesterDashboard from "../tester/TesterDashboard";
import AssignedBugs from "../tester/AssignedBugs";
import BugDetails from "../admin/Bug";
import BugHistory from "../user/BugHistory";
import History from "../admin/History";
import Details from "../user/BugDetails";
import ResTopbar from "./ResTopbar";
import useWindowSize from "./UseWindowSize";
import Chat from "../admin/Chat";
import Notifications from "./Notifications";

axios.defaults.baseURL = "https://bugtrackerbackend-tmcc.onrender.com";
axios.defaults.withCredentials = true;

library.add(fas);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSessionTimeoutPopup, setShowSessionTimeoutPopup] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const sessionTimeoutRef = useRef(null);
  
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
    clearInterval(sessionTimeoutRef);
    setShowSessionTimeoutPopup(false);
    Cookies.remove("isLoggedIn");
    Cookies.remove("isAdmin")
  };
  
  const storedLoginStatus = Cookies.get("isLoggedIn");
  const storedIsAdmin = Cookies.get("isAdmin");
  
  const clearSessionTimeout = useCallback(() => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
    }
  }, []);

  const setSessionTimeout = useCallback(() => {
    clearSessionTimeout();
    const sessionTimeoutDuration = 60 * 60 * 1000;
    sessionTimeoutRef.current = setTimeout(() => {
      setShowSessionTimeoutPopup(true);
    }, sessionTimeoutDuration);
  }, [clearSessionTimeout]); 
  
  const resetSessionTimeout = () => {
    setSessionTimeout();
  };
  
  useEffect(() => {
    setIsLoggedIn(storedLoginStatus === "true");
    setIsAdmin(storedIsAdmin === "true");
    if(storedLoginStatus === "true"){
      setSessionTimeout();
    }
  },[storedLoginStatus, storedIsAdmin, setSessionTimeout]);

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
    <div className="parent" onClick={resetSessionTimeout} onKey={resetSessionTimeout}>
      {/* Popup for session timeout */}
      {showSessionTimeoutPopup && (
        <div className="session-timeout-popup">
          <div className="session-timeout-content">
            <h2>Session Timeout</h2>
            <p>Your session has timed out. Please login again.</p>
            <button onClick={handleLogout} className="cancel-btn btn2">Logout</button>
          </div>
        </div>
      )} 
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

            <Route path="/dashboard" element={storedLoginStatus ? <AdminDashboard /> : <Home onLogin={handleLogin} />} />
            <Route path="/reports" element={storedLoginStatus ? <AdminDisplayReports /> : <Home onLogin={handleLogin} />} />
            <Route path="/bug/:reportId" element={storedLoginStatus ? <BugDetails role="admin"/> : <Home onLogin={handleLogin} />} />
            <Route path="/bug/:reportId/chat" element={storedLoginStatus ? <Chat role="admin"/> : <Home onLogin={handleLogin} />} />
            <Route path="/bug/:reportId/history" element={storedLoginStatus ? <History /> : <Home onLogin={handleLogin} />} />
            <Route path="/users" element={storedLoginStatus ? <AdminDisplayUsers /> : <Home onLogin={handleLogin} />} />
            <Route path="/admin/notifications" element={storedLoginStatus ? <Notifications colorScheme="admin"/>: <Home onLogin={handleLogin} />} />

            <Route path="/dashboard" element={storedLoginStatus ? <TesterDashboard /> : <Home onLogin={handleLogin} />} />
            <Route path="/assignedbugs" element={storedLoginStatus ? <AssignedBugs /> : <Home onLogin={handleLogin} />} />
            <Route path="/assignedbugs/:reportId" element={storedLoginStatus ? <BugDetails role="tester"/> : <Home onLogin={handleLogin} />} />
            <Route path="/bug/:reportId/testerchat" element={storedLoginStatus ? <Chat role="tester"/> : <Home onLogin={handleLogin} />} />
            <Route path="/bug/:reportId/testerhistory" element={storedLoginStatus ? <History /> : <Home onLogin={handleLogin} />}/>
            {/* <Route path="/testerprofile" element={<UserProfile colorScheme="admin"/>} /> */}
            {/* <Route path="/tester/forum" element={<Forum setHasNotifications = {setHasNotifications} role="tester"/>} /> */}
            <Route path="/tester/notifications" element={storedLoginStatus ? <Notifications colorScheme="admin"/> : <Home onLogin={handleLogin} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
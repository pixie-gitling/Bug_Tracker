import React, { useState, useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import Topbar from "../user/Topbar"
import Sidebar from "../user/Sidebar"
import Dashboard from "../user/Dashboard"
import { ReportBug } from "../user/ReportBug"
import DisplayReports from "../user/DisplayReports"
import Forum from "../user/Forum"
import { Home } from "../utils/Home"
import UserProfile from "../user/UserProfile"
import axios from "axios"
import {Toaster} from 'react-hot-toast'
// import { UserContextProvider } from "../context/UserContext"


axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials = true

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoginStatus === 'true');
  }, [])

  const handleLogin = (Admin) => {
    setIsLoggedIn(true)
    // setIsAdmin(Admin)
    localStorage.setItem('isLoggedIn', 'true')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    // setIsAdmin(false)
    localStorage.removeItem('isLoggedIn')
  }

  return (
    // <UserContextProvider>
    <div className="parent">
      <BrowserRouter>
        {isLoggedIn && <Topbar onLogout={handleLogout}/>}
        <Toaster position="top-center" toastOptions={{duration:2000}}/>
        <div className="box">
          {isLoggedIn && <Sidebar/>}
          {/* {isLoggedIn && !window.location.pathname === '/' && (isAdmin ? <AdminSidebar /> : <Sidebar />)} */}
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home onLogin={handleLogin} />}/>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/reportbug" element={<ReportBug/>}></Route>
            <Route path="/myreports" element={<DisplayReports/>}></Route>
            <Route path="/forum" element={<Forum/>}></Route>
            <Route path="/profile" element={<UserProfile/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    // </UserContextProvider>
  )
}

export default App
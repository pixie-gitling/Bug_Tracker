import React from 'react'
import './AdminLogin.css'
import AdminFlip from './AdminFlip'

export const Admin = ({onLogin}) => {

  return (
    <div className='Container'>
        <div className='Hero flex'>
            <div className='Hero-bg'>
              <ul className="Circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                </ul>
            </div>
            <div className='Hero-text'>
              <div className='Hero-heading'>
                <h1>"Streamline issue resolution with <span className='Hero-span'>Bug Tracker</span> – your go-to bug tracking solution for seamless development."</h1>
              </div>
              {/* <div className='hero-btn'>
                  <button className='btn' onClick={() => setToggle(!toggle)}>Start Now!</button>
              </div> */}
            </div>
            <div className='hero-login'>
                <AdminFlip onLogin={onLogin} />
            </div>
        </div>
    </div>
  )
}
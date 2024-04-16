import React, { useState } from 'react'
import './Home.css'
import FlipCard from './FlipCard'

export const Home = ({onLogin}) => {

  const [toggle,setToggle] = useState(true)

  return (
    <div className='container'>
        <div className='hero'>
            <div className='hero-bg'>
              <div className='circle circle1'></div>
              <div className='circle circle2'></div>
              <div className='circle circle3'></div>
            </div>
            <div className='hero-text'>
              <div className='hero-heading'>
                <h1>"Streamline issue resolution with <span>Bug Tracker</span> – your go-to bug tracking solution for seamless development."</h1>
              </div>
              <div className='hero-btn'>
                  <button className='btn' onClick={() => setToggle(!toggle)}>Start Now!</button>
              </div>
            </div>
            <div className='hero-login'>
              {toggle ? <FlipCard onLogin={onLogin} /> : null}
            </div>
        </div>
    </div>
  )
}

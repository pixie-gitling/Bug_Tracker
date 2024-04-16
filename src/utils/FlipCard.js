import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import Login from './Login'
import Signup from './Signup'
import { useNavigate } from 'react-router'

const FlipCard = ({onLogin}) => {

    const[isFlipped, setIsFlipped] = useState()
    const navigate = useNavigate()
    
    const Flip = () => {
        setIsFlipped(!isFlipped)
    }

    const handleLoginClick = () => {
        onLogin()
        navigate("/dashboard")
    }
  return (
    <div className='FlipCard'>
        <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
            <div className='front'>
                <Login onLogin={handleLoginClick} flip={Flip}/>
            </div>
            <div className='back'>
                <Signup flip={Flip}/>
            </div>
        </ReactCardFlip>
    </div>
  )
}

export default FlipCard
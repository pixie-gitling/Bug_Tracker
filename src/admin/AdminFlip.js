import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { useNavigate } from 'react-router'
import {AdminLogin} from './AdminLogin'
import AdminSignup from './AdminSignup'

const AdminFlip = ({onLogin}) => {

    const[isFlipped, setIsFlipped] = useState()
    const navigate = useNavigate()
    
    const Flip = () => {
        setIsFlipped(!isFlipped)
    }

    const handleLoginClick = () => {
        onLogin(true)
        navigate("/admindashboard")
    }

  return (
    <div className='FlipCard'>
        <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
            <div className='front'>
                <AdminLogin onLogin={handleLoginClick} flip={Flip}/>
            </div>
            <div className='back'>
                <AdminSignup flip={Flip}/>
            </div>
        </ReactCardFlip>
    </div>
  )
}

export default AdminFlip
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import Login from './Login'
import Signup from './Signup'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'

const FlipCard = ({onLogin}) => {

    const[isFlipped, setIsFlipped] = useState()
    const navigate = useNavigate()
    
    const Flip = () => {
        setIsFlipped(!isFlipped)
    }

    const handleLoginClick = () => {
        // navigate("/dashboard")
        const role = Cookies.get('role');
        switch(role) {
            case 'Admin':
                console.log('Navigating to Admin Dashboard');
                navigate("/admindashboard");
                break;
                case 'Tester':
                    console.log('Navigating to Tester Dashboard');
                    navigate("/testerdashboard");
                    break;
                    default:
                        console.log('Navigating to User Dashboard');
                        navigate("/");
                    }
        onLogin()
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
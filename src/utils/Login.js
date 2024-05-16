import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../utils/Login.css'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import Cookies from 'js-cookie'

const Login = ({onLogin, flip}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users/login', { username, password });
            const data = response.data;
            if (data.error) {
                toast.error(data.error);
            } else {
                Cookies.set('userId', data.user._id, { expires: 1/24 });
                setUsername('');
                setPassword('');
                toast.success("Login Successful !!!");
                onLogin();
            }
        } catch (error) {
            console.error('Error:', error);
            // toast.error("An error occurred.");
            // Check if there's a response from the server
            if (error.response) {
                console.error('Response data:', error.response.data);
                toast.error(error.response.data.message || 'An error occurred while processing your request.');
            } else if (error.request) { // Check if the request was made but no response was received
                console.error('No response received:', error.request);
                toast.error('No response received from the server.');
            } else { // General error (e.g., network error)
                console.error('Error message:', error.message);
                toast.error('An error occurred while processing your request.');
            }
        }
    };
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
  
  return (
        <div className='login flex'>
                <div className='login-form'>
                    <form onSubmit={handleSubmit} className='flex'>
                        <div className='heading'>
                            <h1>Login</h1>
                        </div>
                        <div className='username'>
                            <input type='text' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className='password flex'>
                            <input type={showPassword ? 'text' : 'password'} placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className='tog-pass'>
                                <button className='tog-btn' type='button' onClick={togglePasswordVisibility}>{showPassword ? 'Hide' : 'Show'}</button>
                            </div>
                        </div>
                        <div className='login-btn'>
                            <button className='lg-btn' type='submit'>Login</button>
                        </div>
                    </form>
                    <div className='sign'>
                        <p>Don't have an account?<Link to='/' onClick={flip}>SignUp</Link></p>
                    </div>
                </div>
        </div>
  )
}

export default Login
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../utils/Login.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const Login = ({ onLogin, flip }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users/login', { username, password });
            const data = response?.data;
            
            if (data?.error) {
                toast.error(data.error);
            } else {
                Cookies.set('userId', data?.user?._id, { expires: 1 / 24 });
                Cookies.set('username', username, { expires: 1 / 24 });
                Cookies.set('name', data?.user?.name, { expires: 1 / 24 });
                Cookies.set('role', data?.role, { expires: 1 / 24 });
                setUsername('');
                setPassword('');
                toast.success("Login Successful !!!");

                switch (data?.role) {
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
                onLogin();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response?.data?.error || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className='login flex'>
            <div className='login-form'>
                <form onSubmit={handleLogin} className='flex'>
                    <div className='header flex'>
                        <h1>Login</h1>
                    </div>
                    <div className='username'>
                        <input type='text' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} />
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
                    <p>Don't have an account? <Link to='/' onClick={flip}>SignUp</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

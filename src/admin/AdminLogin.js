import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

export const AdminLogin = ({ flip }) => {
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
            const response = await axios.post('/users/admin/login', { username, password });
            const data = response.data;
            if (data.error) {
                toast.error(data.error);
            } else {
                Cookies.set('userId', data.user._id, { expires: 1/24 });
                Cookies.set('username', username, { expires: 1/24 });
                Cookies.set('name', data.user.name, { expires: 1/24 });

                // Navigate based on the role fetched from the response
                if (data.user.role === 'Admin') {
                    navigate("/admindashboard");
                    toast.success("Admin Login Successful !!!");
                } else if (data.user.role === 'Tester') {
                    navigate("/testerdashboard");
                    toast.success("Tester Login Successful !!!");
                } else {
                    toast.error("Invalid credentials.");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className='login flex'>
            <div className='Login-form'>
                <form onSubmit={handleLogin} className='flex'>
                    <div className='heading'>
                        <h1>Admin/Tester Login</h1>
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
                        <button className='Lg-btn' type='submit'>Login</button>
                    </div>
                </form>
                <div className='sign'>
                    <p>Don't have an account?<Link to='/adminlogin' onClick={flip}>SignUp</Link></p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
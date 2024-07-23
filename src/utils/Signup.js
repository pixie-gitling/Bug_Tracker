import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../utils/Login.css';
import { toast } from 'react-hot-toast';

const Signup = ({ flip }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [setIsAdmin] = useState(false);

    const nameRegex = /^[A-Z][a-zA-Z]*$/;
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._@]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{7,}$/;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const validateName = () => {
        if (!nameRegex.test(name)) {
            toast.error("Name must contain only characters and the first character must be capital.");
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const validateUsername = () => {
        if (!usernameRegex.test(username)) {
            toast.error("Username must start with a letter and contain at least 3 characters, allowing numbers, '.', '_', or '@'.");
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validatePassword = () => {
        if (!passwordRegex.test(password)) {
            toast.error("Password must contain a number, a special character, a lowercase letter, an uppercase letter, and be at least 7 characters long.");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setRole(selectedRole);
        setIsAdmin(selectedRole === 'Admin'); // Update isAdmin based on the selected role
        if (!selectedRole) {
            toast.error("Please select a Role.");
        }
    };

    const getBase64ProfilePicture = async () => {
        const response = await fetch('/profile.jpg');
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject('Error converting image to base64');
            reader.readAsDataURL(blob);
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                toast.error("Passwords don't match.");
                return;
            }
    
            const image = await getBase64ProfilePicture();
    
            const response = await axios.post('/users/signup', {
                name,
                username,
                password,
                image,
                role,
                isAdmin: role === "Admin" ? true : false,
            });
    
            const data = response.data;
            
            if (data.error) {
                toast.error(data.error);
            } else {
                setName('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                setRole('');
                flip();
                toast.success('SignUp successful !!!');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                // The backend returned a specific error message
                toast.error(error.response.data.error);
            } else {
                // A generic error occurred
                toast.error('An error occurred. Please try again.');
            }
            console.error(error);
        }
    };
    

    return (
        <div className='login flex'>
            <div className='login-form'>
                <form onSubmit={handleSignup} className='flex'>
                    <div className='header'>
                        <h1>Signup</h1>
                    </div>
                    <div className='name'>
                        <input 
                            type='text' 
                            placeholder='Enter Name' 
                            value={name} 
                            onChange={handleNameChange} 
                            onBlur={validateName} 
                        />
                    </div>
                    <div className='username'>
                        <input 
                            type='text' 
                            placeholder='Enter Username' 
                            value={username} 
                            onChange={handleUsernameChange} 
                            onBlur={validateUsername} 
                        />
                    </div>
                    <div className='password flex'>
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder='Enter Password' 
                            value={password} 
                            onChange={handlePasswordChange} 
                            onBlur={validatePassword} 
                        />
                        <div className='tog-pass'>
                            <button type='button' className='tog-btn' onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <div className='confirm-password'>
                        <input 
                            type='password' 
                            placeholder='Confirm Password' 
                            value={confirmPassword} 
                            onChange={handleConfirmPasswordChange} 
                        />
                    </div>
                    <div className='role'>
                        <select value={role} onChange={handleRoleChange}>
                            <option value='' disabled>Select User</option>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            <option value="Tester">Tester</option>
                        </select>
                    </div>
                    <div className='login-btn'>
                        <button className='lg-btn' type='submit'>
                            SignUp
                        </button>
                    </div>
                </form>
                <div className='sign'>
                    <p>
                        Already have an account?
                        <Link to='/' onClick={flip}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import zxcvbn from 'zxcvbn'; 
import '../utils/Login.css';
import toast from 'react-hot-toast';

const Signup = ({ flip }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [passwordStrength, setPasswordStrength] = useState(0);

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
    };

    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        // Update password strength meter
        // const { score } = zxcvbn(newPassword);
        // setPasswordStrength(score);
    };

    const handleConfirmPasswordChange = (e) => {
        const newPassword = e.target.value;
        setConfirmPassword(newPassword);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                toast.error("Passwords don't match.");
                return;
            }

            const { data } = await axios.post('/users/signup', { name, username, password });
            if (data.error) {
                console.log(data.error);
                if (data.error === 'User already exists') {
                    toast.error('Username is already taken. Please choose another one.');
                } else {
                    toast.error(data.error);
                }
            } else {
                setName('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                // setPasswordStrength(0);
                toast.success('SignUp successful !!!');
                flip();
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className='login flex'>
            <div className='login-form'>
                <form onSubmit={handleSubmit} className='flex'>
                    <div className='heading'>
                        <h1>Signup</h1>
                    </div>
                    <div className='name'>
                        <input type='text' placeholder='Enter Name' value={name} onChange={handleNameChange} />
                    </div>
                    <div className='username'>
                        <input type='text' placeholder='Enter Username' value={username} onChange={handleUsernameChange} />
                    </div>
                    <div className='password flex'>
                        <input type={showPassword ? 'text' : 'password'} placeholder='Enter Password' value={password} onChange={handlePasswordChange} />
                        <div className='tog-pass'>
                            <button type='button' className='tog-btn' onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <div className='confirm-password'>
                        <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    </div>
                    {/* <div className='password-strength'>
                        Password Strength: {passwordStrength}/5
                    </div> */}
                    <div className='login-btn'>
                        <button className='lg-btn' type='submit'>SignUp</button>
                    </div>
                </form>
                <div className='sign'>
                    <p>Already have an account?<Link to='/' onClick={flip}>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;

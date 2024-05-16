import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AdminSignup = ({ flip }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setRole(selectedRole);
        setIsAdmin(selectedRole === 'Admin'); // Update isAdmin based on the selected role
    }

    const getBase64ProfilePicture = async () => {
        const response = await fetch('/profile.jpg')
        const blob = await response.blob()
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.onerror = () => reject('Error converting image to base64')
            reader.readAsDataURL(blob)
        })
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                toast.error("Passwords don't match.");
                return;
            }

            const image = await getBase64ProfilePicture();

            const { data } = await axios.post('/users/admin/signup', {
                name,
                username,
                password,
                image,
                isAdmin,
                role: isAdmin ? "Admin" : "Tester"
            });
            if (data.error) {
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
                setRole('');
                flip();
                toast.success('SignUp successful !!!');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        }
    };


    return (
        <div className='login flex'>
            <div className='Login-form'>
                <form onSubmit={handleSignup} className='flex'>
                    <div className='heading'>
                        <h1>Admin/Tester Signup</h1>
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
                    <div className='role'>
                        <select value={role} onChange={handleRoleChange}>
                            <option value='' disabled>Select User</option>
                            <option value="Admin">Admin</option>
                            <option value="Tester">Tester</option>
                        </select>
                    </div>
                    <div className='login-btn'>
                        <button className='Lg-btn' type='submit'>
                            SignUp
                        </button>
                    </div>
                </form>
                <div className='sign'>
                    <p>
                        Already have an account?<Link to='/adminlogin' onClick={flip}>
                            Login
                        </Link></p>
                </div>
            </div>
        </div>
    );
};

export default AdminSignup;
import React, { useRef, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';
import Webcam from "react-webcam";
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const UserProfile = () => {
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        image: null // Assuming profile picture is stored as 'image' in userData
    });
    const [showCamera, setShowCamera] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [tempUserData, setTempUserData] = useState({}); // Temp storage for changes in edit mode
    const imageRef = useRef(null);
    const webcamRef = useRef(null);

    useEffect(() => {
        const userId = Cookies.get('userId');

        if (userId) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`/users/${userId}`);
                    const userData = response.data;
                    setUserData(userData);
                    setTempUserData(userData);
                } catch (error) {
                    toast.error('Error fetching user data:', error);
                }
            };
            fetchUserData();
        }
    }, []);

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setTempUserData(prevUserData => ({
                ...prevUserData,
                image: imageSrc
            }));
            setShowCamera(false);
        }
    }, [webcamRef]);

    const handleCameraToggle = () => {
        if (editMode) {
            if (!showCamera) {
                setShowCancel(true);
            }
            setShowCamera(prevShowCamera => !prevShowCamera);
        } else {
            toast.error('Please enable edit mode to take a picture.');
        }
    };

    const handleCancelCamera = () => {
        setShowCamera(false);
        setShowCancel(false);
    };

    const handleChange = (e) => {
        if (editMode) {
            const { name, value } = e.target;
            setTempUserData(prevTempUserData => ({
                ...prevTempUserData,
                [name]: value
            }));
        }
    };

    const handleImageClick = () => {
        if (editMode) {
            imageRef.current.click();
        } else {
            toast.error('Please enable edit mode to change the profile picture.');
        }
    };

    const handleImageChange = (e) => {
        if (editMode) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setTempUserData(prevTempUserData => ({
                    ...prevTempUserData,
                    image: reader.result
                }));
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            const userId = Cookies.get('userId');
            if (!userId) {
                toast.error('User ID not found');
                return;
            }

            const response = await axios.put(`/users/${userId}`, tempUserData);

            if (response.status === 200) {
                setUserData(tempUserData); // Update userData with changes
                setEditMode(false); // Exit edit mode
                toast.success('User profile updated successfully');
            } else {
                toast.error('Failed to update user profile');
            }
        } catch (error) {
            toast.error('Error updating user profile:', error);
        }
    };

    const handleCancel = () => {
        setTempUserData(userData); // Reset tempUserData to userData
        setEditMode(false); // Exit edit mode
    };

    return (
        <div className='UserProfile flex'>
            <form className='profile-form flex'>
                <div className='profile-heading'>
                    <h1>User Profile</h1>
                </div>
                <div className='profile-name'>
                    <label>Name</label>
                    <input type='text' placeholder='Name' name='name' value={editMode ? tempUserData.name : userData.name} onChange={handleChange} readOnly={!editMode} />
                </div>
                <div className='profile-username'>
                    <label>Username</label>
                    <input type='text' placeholder='Username' value={userData.username} readOnly onClick={()=>{toast.error("Username cannot be changed")}} />
                </div>
                <div className='save-btn flex'>
                    {editMode ? (
                        <>
                            <button className='sv-btn' type='button' onClick={handleSave}>Save</button>
                            <button className='cancel-btn' type='button' onClick={handleCancel}>Cancel</button>
                        </>
                    ) : (
                        <button className='edit-btn' type='button' onClick={handleEdit}>Edit</button>
                    )}
                </div>
            </form>
            <div className='profile-img'>
                <h2>Profile Picture</h2>
                <div>
                    {tempUserData.image ? (
                        <img src={tempUserData.image} alt='Profile Picture' className='profile-image' />
                    ) : (
                        <img src="../profile.jpg" alt='Profile Picture' className='profile-image' />
                    )}
                </div>
                {editMode && (
                    <div className='choose-img'>
                        <input type="file" accept="image/*" ref={imageRef} onChange={handleImageChange} className='input-image' />
                        <button type='button' className='sv-btn' onClick={handleImageClick}>Choose Image</button>
                        <br/><br/>
                        {showCamera && (
                            <Webcam audio={false} height={300} ref={webcamRef} screenshotFormat="image/jpeg" width={300} mirrored={true} />
                        )}
                        <button type='button' onClick={handleCameraToggle} className='sv-btn'>{showCamera ? 'Capture' : 'Take a picture'}</button>
                        {showCancel && (
                            <button type='button' onClick={handleCancelCamera} className='cancel-btn'>Cancel</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
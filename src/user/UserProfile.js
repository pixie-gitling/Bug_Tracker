import React, { useRef, useState, useCallback } from 'react'
import './UserProfile.css'
import Webcam from "react-webcam"

const UserProfile = () => {

    const[username, setUsername] = useState()
    const[password, setPassword] = useState()
    const[image, setImage] = useState(null)
    const[showCamera, setShowCamera] = useState(false)
    const imageRef = useRef(null)
    const webcamRef = useRef(null)

    const capture = useCallback(
    () => {
        if(webcamRef.current){
            const imageSrc = webcamRef.current.getScreenshot()
            setImage(imageSrc)
            setShowCamera(false)
        }
    },
    [webcamRef])

    const handleCameraToggle = () => {
        setShowCamera(prevShowCamera => {
            if (prevShowCamera) {
                capture()
            }
            return !prevShowCamera
        })
    }
    

    const handleUsername = (e) => {
        setUsername(e.target.value)
    } 
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleImageClick = () => {
        imageRef.current.click()
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
        setImage(reader.result)
        }

        if (file) {
        reader.readAsDataURL(file)
        }
    }

    const handleSubmit = () => {
        
    }

  return (
    <div className='UserProfile flex'>
        <form onSubmit={handleSubmit} className='profile-form flex'>
            <div className='profile-heading'>
                <h1>User Profile</h1>
            </div>
            <div className='profile-name'>
                <label>Name</label>
                <input type='text' placeholder='Name' />
            </div>
            <div className='profile-username'>
                <label>Username</label>
                <input type='text' placeholder='Username' value={username} onChange={handleUsername} />
            </div>
            <div className='profile-password'>
                <label>Password</label>
                <input type='password' placeholder='Password' value={password} onChange={handlePassword}/>
            </div>
            <div className='save-btn'>
                <button className='sv-btn' type='submit'>Save</button>
            </div>
        </form>
        <div className='profile-img'>
            <h2>Profile Picture</h2>
            <div>
                {image ? ( 
                    <img  src={image} alt='Profile Picture' className='profile-image'/>
                ) : (<img src="..\profile.jpg" alt='Profile Picture' className='profile-image'/>)                   
                }
            </div>
            <div className='choose-img'>
                <input type="file" accept="image/*" ref={imageRef} onChange={handleImageChange} className='input-image' />
                <button type='button' className='choose btn' onClick ={handleImageClick} >Choose Image</button>
            </div>
            <div className='take-picture'>
              {showCamera && (<Webcam audio={false} height={300} ref={webcamRef} screenshotFormat="image/jpeg" width={300} mirrored ={true} />)}
               <button type='button' onClick={handleCameraToggle}  className='take btn'>{showCamera ? 'Capture' : 'Take a picture'}</button>
            </div>
        </div>
    </div>
  )
}

export default UserProfile
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReportBug.css';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie'; // Import Cookies

export const ReportBug = () => {
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null); 
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Retrieve userId from cookies
        const userIdFromCookie = Cookies.get('userId');
        if (userIdFromCookie) {
            setUserId(userIdFromCookie);
            console.log(userIdFromCookie);
        }
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Preview the selected image
        const reader = new FileReader();
        reader.onload = () => {
            setFilePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            
            if (!userId || !title || !description || !file) {
                toast.error('Please fill out all fields');
                setLoading(false);
                return;
            }
    
            // Read the file as a binary blob
            const reader = new FileReader();
            reader.onload = async () => {
                const fileData = reader.result; // File data as base64 string
    
                // Send data as JSON
                const requestData = {
                    User: userId,
                    title: title,
                    description: description,
                    fileAttached: fileData // File data as base64 string
                };
    
                try {
                    const response = await axios.post('/report/bug', requestData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
    
                    if (response.status === 201) {
                        toast.success('Bug report submitted successfully');
                        setTitle('');
                        setDescription('');
                        setFile(null);
                        setFilePreview('')
                        e.target.reset();
                    } else {
                        toast.error('Error submitting bug report');
                    }
                } catch (error) {
                    if (error.response) {
                        toast.error('Error submitting bug report');
                    } else if (error.request) {
                        toast.error('No response received from server');
                    } else {
                        toast.error('An unexpected error occurred');
                    }
                } finally {
                    setLoading(false);
                }
            };
    
            reader.onerror = () => {
                toast.error('Error reading the file');
                setLoading(false);
            };
    
            reader.readAsDataURL(file); 
        } catch (error) {
            toast.error('An unexpected error occurred');
            setLoading(false);
        }
    };    

    return (
        <div className='reportBug flex'>
            <div className='bug-form flex'>
                <form onSubmit={handleSubmit} className='flex'>
                    <div className='form-heading'>
                        <h1>Report a Bug</h1>
                    </div>
                    <div className='form-item title'>
                        <input type='text' placeholder='Bug Title' value={title} onChange={handleTitleChange} />
                    </div>
                    <div className='form-item description'>
                        <textarea placeholder='Bug Description' value={description} onChange={handleDescriptionChange} />
                    </div>
                    <div className='form-item file'>
                        {filePreview && <img src={filePreview} alt='File Preview'className='file-preview' height='200' />}
                        <input type='file' accept='image/*' placeholder='Attach a File' onChange={handleFileChange} />
                    </div>
                    <div className='form-item form-submit'>
                        <button type='submit' disabled={loading}>{loading ? 'Submitting...' : 'Submit Report'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
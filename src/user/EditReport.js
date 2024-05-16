import { useState, useEffect } from 'react';
import './DisplayReports.css'

// Define the component
const EditReport = ({ report, onSave, onClose }) => {
    const [title, setTitle] = useState(report.title); // State for title field
    const [description, setDescription] = useState(report.description); // State for description field
    const [file, setFile] = useState(null); // State for file input
    const [filePreview, setFilePreview] = useState(report.fileAttached || ''); // State for file preview

    // Function to handle saving changes to the report
    const handleSave = () => {
        // Create an updated report object with the changed fields
        const updatedReport = {
            ...report,
            title: title,
            description: description,
            fileAttached: filePreview // Update the image with the selected file preview
        };

        // Call the onSave callback with the updated report details
        onSave(updatedReport);
    };

    // Function to handle file input change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Preview the selected image
        const reader = new FileReader();
        reader.onload = () => {
            setFilePreview(reader.result); // Update the file preview
        };
        reader.readAsDataURL(selectedFile);
    };

    // Function to clear file input when a new file is selected
    useEffect(() => {
        if (!file) {
            setFilePreview(''); // Clear the file preview when no file is selected
        }
    }, [file]);

    return (
        <div className='editReport flex'>
            <div className='bug-form flex'>
                <form onSubmit={handleSave} className='flex'>
                    <div className='form-heading'>
                        <h1>Edit a Report</h1>
                    </div>
                    <div className='form-item title'>
                        <input type='text' placeholder='Bug Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='form-item description'>
                        <textarea placeholder='Bug Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='form-item file'>
                        {filePreview && <img src={filePreview} alt='File Preview' className='file-preview' height='200' />}
                        <input type='file' accept='image/*' onChange={handleFileChange} />
                    </div>
                    <div className='form-item form-submit'>
                        <button type='button' onClick={handleSave} className='table-btn btn1'>Save</button> <br/><br/>
                        <button type='button' onClick={onClose} className='table-btn btn2'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReport;
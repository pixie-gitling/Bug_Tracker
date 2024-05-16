import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './DisplayReports.css';
import EditReport from './EditReport';
import Cookies from 'js-cookie';

const DisplayReports = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null); // State to store the selected report
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the modal
    const [zoomedImage, setZoomedImage] = useState(null); // State to store the zoomed image URL

    useEffect(() => {
        try {
            const fetchReports = async () => {
                const response = await axios.get(`/report/${Cookies.get('userId')}`);
                setReports(response.data);
            };

            fetchReports();
        } catch (error) {
            toast.error('Error Fetching Reports');
            console.log(error);
        }
    }, []);

    // Function to handle opening the modal and setting the selected report
    const handleOpenModal = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Function to handle saving the edited report
    const handleSaveReport = async (updatedReport) => {
        try {
            // Update the report in the database
            const response = await axios.put(`/report/${updatedReport._id}`, updatedReport);
            if (response.status === 200) {
                // If the update is successful, update the local state with the updated report
                setReports(reports.map(report => report._id === updatedReport._id ? updatedReport : report));
                toast.success('Report updated successfully');
                setIsModalOpen(false); // Close the modal after successful update
            } else {
                toast.error('Error updating report');
            }
        } catch (error) {
            toast.error('Error updating report');
            console.log(error);
        }
    };

    // Function to handle zooming in on the image
    const handleZoomImage = (imageUrl) => {
        setZoomedImage(imageUrl);
    };

    // Function to handle closing the zoomed image
    const handleCloseZoomedImage = () => {
        setZoomedImage(null);
    };

    return (
        <div className='DisplayReports flex'>
            <div className='bugTable'>
                <table>
                    <thead>
                        <tr className='flex'>
                            <th>Bug Title</th>
                            <th>Bug Description</th>
                            <th>File Attached</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report._id} className='flex'>
                                <td>{report.title}</td>
                                <td>{report.description}</td>
                                <td>
                                    {report.fileAttached && 
                                        <img 
                                            src={report.fileAttached} 
                                            alt='File Attached' 
                                            className='fileAttached' 
                                            height='150' 
                                            onClick={() => handleZoomImage(report.fileAttached)} 
                                        />
                                    }
                                </td>
                                <td>{report.status}</td>
                                <td> 
                                    <button className='table-btn btn1 flex' onClick={() => handleOpenModal(report)}>Edit</button> 
                                </td>
                            </tr>
                        ))}
                        {/* Modal for editing report */}
                        {isModalOpen && (
                            <div className='UserModal flex'>
                                <div className='modal-content flex'>
                                    {/* Pass the selected report data to the EditReport component */}
                                    <EditReport report={selectedReport} onSave={handleSaveReport} onClose={handleCloseModal}/>
                                </div>
                            </div>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Zoomed image */}
            {zoomedImage && (
                <div className='ZoomedImageOverlay' onClick={handleCloseZoomedImage}>
                    <img src={zoomedImage} alt='Zoomed File' className='ZoomedImage'/>
                </div>
            )}
        </div>
    );
};

export default DisplayReports;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './DisplayReports.css';
import EditReport from './EditReport';
import Cookies from 'js-cookie';
import Pagination from '../utils/Pagination';
import SearchBar from '../utils/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

const DisplayReports = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null); // State to store the selected report
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the modal
    const [zoomedImage, setZoomedImage] = useState(null); // State to store the zoomed image URL
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [reportsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

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

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //sorting
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;

    const sortedReports = reports
        .filter(report => report.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortColumn) {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];
                return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
        return 0;
    });
    const currentReports = sortedReports.slice(indexOfFirstReport, indexOfLastReport);

    const handleSort = (column) => {
        setSortColumn(column);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

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

    const handleReportClick = (reportId) => {
        navigate(`/bug/${reportId}/details`);
    };

    const formatTime = (timeString) => {
        const options = { 
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true 
        };
        return new Date(timeString).toLocaleString('en-GB', options);
    };

    return (
        <div className='DisplayReports flex'>
            <div className='header flex'>
                <h1>List of Bug Reports</h1>
                <SearchBar className="search" setSearchTerm={setSearchTerm}/>
            </div>
            <div className='bugTable'>
                <table>
                    <thead>
                        <tr className='flex'>
                            <th onClick={() => handleSort('title')}>Bug Title 
                            <FontAwesomeIcon icon={faSort} className='font-icon' />
                            </th>
                            <th onClick={() => handleSort('description')}>Bug Description
                            <FontAwesomeIcon icon={faSort} className='font-icon' />
                            </th>
                            <th>File Attached</th>
                            <th>Status</th>
                            <th>CreatedAt</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReports.map((report) => (
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
                                <td className={`status ${report.status === 'Reported' ? 'red-text' : report.status === 'Assigned' ? 'yellow-text' : 'green-text'}`}>{report.status}</td>
                                <td>{formatTime(report.createdAt)}</td>
                                <td className='details' onClick={() => handleReportClick(report._id)}>View Details</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Pagination reportsPerPage={reportsPerPage} totalReports={reports.length} paginate={paginate} currentPage={currentPage} />
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../admin/AdminDisplayReports.css';
// import EditBugReportModal from '../admin/EditBugReport';
import Cookies from 'js-cookie';
import TesterResolveBug from './TesterResolveBug';
import SearchBar from '../utils/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../utils/Pagination';
import { useNavigate } from 'react-router';

const AssignedBugs = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [zoomedImage, setZoomedImage] = useState(null);    
    const [currentPage, setCurrentPage] = useState(1);
    const [reportsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const username = Cookies.get('username'); 
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const fetchReports = async () => {
                const response = await axios.get('/report');
                const filteredReports = response.data.filter(report => report.assignedTo === username);
                setReports(filteredReports);
            };
            fetchReports();
        } catch (error) {
            toast.error('Error Fetching Reports');
            console.log(error);
        }
    }, [username]);
    
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

    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = sortedReports.slice(indexOfFirstReport, indexOfLastReport);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        navigate(`/assignedbugs/${reportId}`);
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
                <h1>List of Assigned Bugs</h1>
                <SearchBar setSearchTerm={setSearchTerm} />
            </div>
            <div className='bugTable'>
                <table>
                    <thead className='tableHead'>
                        <tr className='flex'>
                            {/* <th>Bug Id</th> */}
                            <th>Bug Title <FontAwesomeIcon icon={faSort} className='font-icon' onClick={handleSort}/></th>
                            <th>Bug Description <FontAwesomeIcon icon={faSort} className='font-icon' onClick={handleSort}/></th>
                            <th>File Attached</th>
                            <th>Severity</th>
                            {/* <th>Status</th> */}
                            <th>Remark</th>
                            <th>Action</th>
                            <th>CreatedAt</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReports.map((report) => (
                            <tr key={report._id} className='flex'>
                                {/* <td>{report._id}</td> */}
                                <td>{report.title}</td>
                                <td>{report.description}</td>
                                <td>
                                    {
                                        report.fileAttached && 
                                            <img src={report.fileAttached} alt='File Attached' className='fileAttached' height='100' onClick={() => handleZoomImage(report.fileAttached)} />
                                    }
                                </td>
                                <td>{report.severity}</td>
                                {/* <td>{report.status}</td> */}
                                <td>{report.remark}</td>
                                <td>
                                    <button className='Table-Btn Btn1 flex' onClick={() => handleOpenModal(report)}>Edit</button>
                                </td>
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
            <div>
                {/* Modal for editing report */}
                {isModalOpen && (
                    <div className='Modal'>
                        <div className='modalContent flex'>
                            <TesterResolveBug report={selectedReport} onSave={handleSaveReport} onClose={handleCloseModal} />
                        </div>
                    </div>
                )}
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

export default AssignedBugs;
// AdminDisplayReports.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './AdminDisplayReports.css';
import EditBugReportModal from './EditBugReport';
import Pagination from '../utils/Pagination';
import SearchBar from '../utils/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

const AdminDisplayReports = () => {
    const navigate = useNavigate(); 

    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [zoomedImage, setZoomedImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [reportsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('/report');
                setReports(response.data);
            } catch (error) {
                toast.error('Error Fetching Reports');
                console.log(error);
            }
        };

        fetchReports();
    }, []);

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

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleOpenModal = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveReport = async (updatedReport) => {
        try {
            const response = await axios.put(`/report/${updatedReport._id}`, updatedReport);
            if (response.status === 200) {
                setReports(reports.map(report => report._id === updatedReport._id ? updatedReport : report));
                toast.success('Report updated successfully');
                setIsModalOpen(false);
            } else {
                toast.error('Error Updating Report');
            }
        } catch (error) {
            toast.error('Error updating report');
            console.log(error);
        }
    };

    const handleZoomImage = (imageUrl) => {
        setZoomedImage(imageUrl);
    };

    const handleCloseZoomedImage = () => {
        setZoomedImage(null);
    };

    const handleSort = (column) => {
        setSortColumn(column);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleReportClick = (reportId) => {
        navigate(`/bug/${reportId}`);
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
        <div className='displayReports flex'>
            <div className='heading flex'>
                <h1>List of Bug Reports</h1>
                <SearchBar setSearchTerm={setSearchTerm} />
            </div>
            <div className='Bug-Table'>
                <table>
                    <thead className='tableHead'>
                        <tr className='flex'>
                            <th onClick={() => handleSort('title')}>
                                Bug Title
                                <FontAwesomeIcon icon={faSort} className='font-icon' />
                            </th>
                            <th onClick={() => handleSort('description')}>
                                Bug Description
                                <FontAwesomeIcon icon={faSort} className='font-icon' />
                            </th>
                            <th>File Attached</th>
                            <th onClick={() => handleSort('severity')}>
                                Severity
                                <FontAwesomeIcon icon={faSort} className='font-icon' />
                            </th>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th>Remark</th>
                            <th>Action</th>
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
                                    {report.fileAttached && (
                                        <img src={report.fileAttached} alt='File Attached' className='fileAttached' height='100' onClick={() => handleZoomImage(report.fileAttached)} />
                                    )}
                                </td>
                                <td>{report.severity}</td>
                                <td>{report.assignedTo}</td>
                                <td className={`status ${report.status === 'Reported' ? 'red-text' : report.status === 'Assigned' ? 'yellow-text' : 'green-text'}`}>{report.status}</td>
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
            {isModalOpen && (
                <div className='Modal'>
                    <div className='modalContent flex'>
                        <EditBugReportModal report={selectedReport} onSave={handleSaveReport} onClose={handleCloseModal} />
                    </div>
                </div>
            )}
            {zoomedImage && (
                <div className='ZoomedImageOverlay' onClick={handleCloseZoomedImage}>
                    <img src={zoomedImage} alt='Zoomed File' className='ZoomedImage' />
                </div>
            )}
        </div>
    );
};

export default AdminDisplayReports;
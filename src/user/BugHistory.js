import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import './DisplayReports.css'

const BugHistory = () => {
    const { reportId } = useParams();
    const [bugHistory, setBugHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchBugHistory = async () => {
            try {
                const response = await axios.get(`/report/bug/${reportId}/history`);
                setBugHistory(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bug history:', error);
                setError('Error fetching bug history. Please try again later.');
                setLoading(false);
            }
        };

        fetchBugHistory();
    }, [reportId]);

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
    
    const handleSort = (column) => {
        if (column === sortedColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortedColumn(column);
            setSortOrder('asc');
        }
        
        const sortedData = [...bugHistory].sort((a, b) => {
            const aValue = a.previousData[column].toLowerCase();
            const bValue = b.previousData[column].toLowerCase();
    
            if (aValue < bValue) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
    
        setBugHistory(sortedData);
    };
    

    return (
        <div className='bugHistory'>
            <div className='header flex'>
                <h1  >Bug History</h1>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        <div className='bugTable'>
            <table>
                <thead>
                    <tr className='flex'>
                        <th>Updated By</th>
                        <th onClick={() => handleSort('title')}>Title <FontAwesomeIcon icon={faSort} className='font-icon' /> </th>
                        <th onClick={() => handleSort('description')}>Description <FontAwesomeIcon icon={faSort} className='font-icon' /> </th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Created At</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tbody>
                    {bugHistory.map((historyItem, index) => (
                        <tr key={index} className='flex'>
                            <td>{historyItem.updatedBy}</td>
                            <td>{historyItem.previousData.title}</td>
                            <td>{historyItem.previousData.description}</td>
                            <td>{historyItem.previousData.status}</td>
                            <td>{historyItem.previousData.assignedTo}</td>
                            <td>{formatTime(historyItem.previousData.createdAt)}</td>
                            <td>{formatTime(historyItem.previousData.updatedAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default BugHistory;
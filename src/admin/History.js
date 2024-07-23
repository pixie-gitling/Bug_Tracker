import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Bug.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

const History = () => {
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
    };

    return (
        <div className='history'>
            <div className='header flex'>
                <h1>Bug History</h1>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className='bug-history-div' >
            <table className='bugTable'>
                <thead className='tableHead'>
                    <tr className='flex'>
                        <th>Updated By</th>
                        <th>UpdatedAt</th>
                        <th onClick={() => handleSort('title')}>Title <FontAwesomeIcon icon={faSort} className='font-icon' /> </th>
                        <th onClick={() => handleSort('title')}>Description <FontAwesomeIcon icon={faSort} className='font-icon' /> </th>
                        <th onClick={() => handleSort('title')}>Severity <FontAwesomeIcon icon={faSort} className='font-icon' /> </th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Remark</th>
                        <th>Created At</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tbody>
                    {bugHistory.map((historyItem, index) => (
                        <tr key={index} className='flex'>
                            <td>{historyItem.updatedBy}</td>
                            <td>{formatTime(historyItem.updatedAt)}</td>
                            <td>{historyItem.previousData.title}</td>
                            <td>{historyItem.previousData.description}</td>
                            <td>{historyItem.previousData.severity}</td>
                            <td>{historyItem.previousData.status}</td>
                            <td>{historyItem.previousData.assignedTo}</td>
                            <td>{historyItem.previousData.remark}</td>
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

export default History;
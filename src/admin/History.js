import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Bug.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

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
        const newSortOrder = column === sortedColumn && sortOrder === 'asc' ? 'desc' : 'asc';
        const sortedData = [...bugHistory].sort((a, b) => {
            const aValue = a.previousData[column].toLowerCase();
            const bValue = b.previousData[column].toLowerCase();

            if (aValue < bValue) {
                return newSortOrder === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return newSortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setBugHistory(sortedData);
        setSortedColumn(column);
        setSortOrder(newSortOrder);
    };

    return (
        <div className='history'>
            <div className='heading flex'>
                <h1>Bug History</h1>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <table className='bug-history-table'>
                <thead className='tableHead'>
                    <tr className='flex'>
                        <th>Updated By</th>
                        <th>UpdatedAt</th>
                        <th onClick={() => handleSort('title')}>Title <FontAwesomeIcon icon={faSort} className={`font-icon ${sortedColumn === 'title' && sortOrder === 'asc' ? 'font-icon-red' : ''}`} /> </th>
                        <th onClick={() => handleSort('description')}>Description <FontAwesomeIcon icon={faSort} className={`font-icon ${sortedColumn === 'description' && sortOrder === 'asc' ? 'font-icon-red' : ''}`} /> </th>
                        <th onClick={() => handleSort('severity')}>Severity <FontAwesomeIcon icon={faSort} className={`font-icon ${sortedColumn === 'severity' && sortOrder === 'asc' ? 'font-icon-red' : ''}`}/> </th>
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
    );
};

export default BugHistory;
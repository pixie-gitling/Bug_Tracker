import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

const Dashboard = () => {
    const navigate = useNavigate();
    const [totalBugs, setTotalBugs] = useState(0);
    const [resolvedBugs, setResolvedBugs] = useState(0);
    const [unresolvedBugs, setUnresolvedBugs] = useState(0);
    const [assignedBugs, setAssignedBugs] = useState(0);

    const role = Cookies.get('role');
    const userId = Cookies.get('userId');
    const username = Cookies.get('username');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                let response;
                if (role === 'Admin') {
                    response = await axios.get('/report');
                } else if (role === 'Tester') {
                    response = await axios.get('/report');
                    response.data = response.data.filter(report => report.assignedTo === username);
                } else {
                    response = await axios.get(`/report/${userId}`);
                }

                const reports = response.data;

                setTotalBugs(reports.length);
                setResolvedBugs(reports.filter(report => report.status === 'Resolved').length);
                setUnresolvedBugs(reports.filter(report => report.status === 'Reported').length);
                setAssignedBugs(reports.filter(report => report.status === 'Assigned').length);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, [role, userId, username]);

    const handleCardClick = (status) => {
        navigate(`/reports?status=${status}`);
    };

    return (
        <div className='dashboard'>
            <div className='dash-items'>
                <div className='card' onClick={() => handleCardClick('Reported')}>
                    <div className='card-items'>
                        <div className='card-heading'>
                            <h1>Total Bugs Reported</h1>
                        </div>
                        <div className='card-data'>
                            <h1>{totalBugs}</h1>
                        </div>
                    </div>
                </div>
                <div className='card' onClick={() => handleCardClick('Resolved')}>
                    <div className='card-items'>
                        <div className='card-heading'>
                            <h1>No. of Bugs Resolved</h1>
                        </div>
                        <div className='card-data'>
                            <h1>{resolvedBugs}</h1>
                        </div>
                    </div>
                </div>
                <div className='card' onClick={() => handleCardClick('Assigned')}>
                    <div className='card-items'>
                        <div className='card-heading'>
                            <h1>No. of Bugs Assigned</h1>
                        </div>
                        <div className='card-data'>
                            <h1>{assignedBugs}</h1>
                        </div>
                    </div>
                </div>
                <div className='card' onClick={() => handleCardClick('Unresolved')}>
                    <div className='card-items'>
                        <div className='card-heading'>
                            <h1>No. of Bugs Unresolved</h1>
                        </div>
                        <div className='card-data'>
                            <h1>{unresolvedBugs}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Dashboard = () => {
    const [userId, setUserId] = useState('')
    const [totalBugs, setTotalBugs] = useState(0);
    const [resolvedBugs, setResolvedBugs] = useState(0);
    const [unresolvedBugs, setUnresolvedBugs] = useState(0);
    const [assignedBugs, setAssignedBugs] = useState(0);
    // const userId = Cookies.get('userId');

    useEffect(() => {
        const fetchReportsByUserId = async () => {
            try {
                    const response = await axios.get(`/report/${Cookies.get('userId')}`);
                    console.log(userId);
                    const reports = response.data;
                    console.log(reports);

                    setTotalBugs(reports.length);
                    setResolvedBugs(reports.filter(reports => reports.status === 'Resolved').length);
                    setUnresolvedBugs(reports.filter(reports => reports.status === 'Reported').length);
                    setAssignedBugs(reports.filter(reports => reports.status === 'Assigned').length);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReportsByUserId();
    }, [userId]);

    return (
        <div className='dashboard'>
            <div className='dash-items'>
                <div className='card'>
                    <div className='card-items'>
                        <div className='card-heading'>
                            <h1>Total Bugs Reported</h1>
                        </div>
                        <div className='card-data'>
                            <h1>{totalBugs}</h1>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-items'>
                        <div className='card-heading'>
                            <h1>Resolved Bugs</h1>
                        </div>
                        <div className='card-data'>
                            <h1>{resolvedBugs}</h1>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-items'>
                        <div className='card-heading'>
                            <h1>Unresolved Bugs </h1>
                        </div>
                        <div className='card-data'>
                            <h1>{unresolvedBugs}</h1>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-items'>
                        <div className='card-heading'>
                            <h1>Assigned Bugs </h1>
                        </div>
                        <div className='card-data'>
                            <h1>{assignedBugs}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
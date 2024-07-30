import React, { useEffect, useState } from 'react';
import '../admin/AdminDashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie'

const TesterDashboard = () => {
    const navigate = useNavigate();

    const [resolvedBugs, setResolvedBugs] = useState(0);
    const [unresolvedBugs, setUnresolvedBugs] = useState(0);
    const [assignedBugs, setAssignedBugs] = useState(0);
    const user = Cookies.get('username');

    useEffect(() => {
        const fetchBugReports = async () => {
            const response = await axios.get('/report');
            const bugs = response.data.filter(report => report.assignedTo === user);

            setUnresolvedBugs(bugs.filter(report => report.status === 'Reported'));
            setAssignedBugs(bugs.filter(report => report.status === 'Assigned'));
            setResolvedBugs(bugs.filter(report => report.status === 'Resolved'));
        };

        fetchBugReports();
    });

    const handleCardClick = (status) => {
        navigate(`/reports?status=${status}`);
    };

    return (
        <div className='admin'>
            <div className='DashItems'>
                <div className='Card' onClick={() => handleCardClick('Assigned')}>
                    <div className='CardItems'>
                        <div className='CardHeading'>
                            <h1>Total Bugs Assigned</h1>
                        </div>
                        <div className='CardData'>
                            <h1>{assignedBugs.length}</h1>
                        </div>
                    </div>
                </div>
                <div className='Card' onClick={() => handleCardClick('Resolved')}>
                    <div className='CardItems'>
                        <div className='CardHeading'>
                            <h1>No. of Bugs Resolved</h1>
                        </div>
                        <div className='CardData'>
                            <h1>{resolvedBugs.length}</h1>
                        </div>
                    </div>
                </div>
                <div className='Card' onClick={() => handleCardClick('Unresolved')}>
                    <div className='CardItems'>
                        <div className='CardHeading'>
                            <h1>No. of Bugs Unresolved</h1>
                        </div>
                        <div className='CardData'>
                            <h1>{unresolvedBugs.length}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TesterDashboard;
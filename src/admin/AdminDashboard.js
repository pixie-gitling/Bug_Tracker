import React, { useEffect, useState } from 'react';
import '../admin/AdminDashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [totalBugs, setTotalBugs] = useState(0);
    const [resolvedBugs, setResolvedBugs] = useState(0);
    const [unresolvedBugs, setUnresolvedBugs] = useState(0);
    const [assignedBugs, setAssignedBugs] = useState(0);

    useEffect(() => {
        const fetchBugReports = async () => {
            const response = await axios.get('/report');
            const bugs = response.data;

            setTotalBugs(bugs);
            setUnresolvedBugs(bugs.filter(report => report.status === 'Reported'));
            setAssignedBugs(bugs.filter(report => report.status === 'Assigned'));
            setResolvedBugs(bugs.filter(report => report.status === 'Resolved'));
        };

        fetchBugReports();
    }, []);

    const handleCardClick = (status) => {
        navigate(`/reports?status=${status}`);
    };

    return (
        <div className='admin'>
            <div className='DashItems'>
                <div className='Card' onClick={() => handleCardClick('Reported')}>
                    <div className='CardItems'>
                        <div className='CardHeading'>
                            <h1>Total Bugs Reported</h1>
                        </div>
                        <div className='CardData'>
                            <h1>{totalBugs.length}</h1>
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
                <div className='Card' onClick={() => handleCardClick('Assigned')}>
                    <div className='CardItems'>
                        <div className='CardHeading'>
                            <h1>No. of Bugs Assigned</h1>
                        </div>
                        <div className='CardData'>
                            <h1>{assignedBugs.length}</h1>
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

export default AdminDashboard;

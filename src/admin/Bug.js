import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Bug.css';

const BugDetails = ({role}) => {
    const { reportId } = useParams(); 
    const navigate = useNavigate();
    const [bugDetails, setBugDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBugDetails = async () => {
            try {
                const response = await axios.get(`/report/bug/${reportId}`);
                setBugDetails(response.data);
                setLoading(false);
            } catch (error) {
                toast.error('Error Fetching Bug Details');
                console.log(error);
            }
        };

        fetchBugDetails();
    }, [reportId]);

    
    // const revertToVersion = async (updateId) => {
        //     try {
            //       const response = await axios.put(`/bug/${reportId}/revert/${updateId}`);
            //       setBugDetails(response.data.report);
            //     } catch (error) {
                //       console.error('Error Reverting to Version:', error);
                //     }
                //   };
                
                if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!bugDetails) {
        return <div>No bug details found or an error occurred while fetching data.</div>;
    }
    
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
    
    const handleChatClick = () => {
        if (role === "admin") {
          navigate(`/bug/${reportId}/chat`);
        } else
        if (role === 'tester') {
          navigate(`/bug/${reportId}/testerchat`);
        }
      }  
    
    const handleHistoryClick = () => {
        if (role === "admin") {
            navigate(`/bug/${reportId}/history`);
          } else
          if (role === 'tester') {
            navigate(`/bug/${reportId}/testerhistory`);
        }
    }

    return (
        <div className='bug-details'>
            <div className='header flex'>
                <h1>Bug Details</h1>
            </div>
            <div className='detail flex'>
                <div className='left'>
                    <h3>Bug Title: <input className='detail-ip' value={bugDetails.title} readOnly/> </h3>
                    <h3>Bug Description: <textarea className='detail-ip' value={bugDetails.description} style={{fontFamily: 'sans-serif'}} readOnly/> </h3>
                    <h3>Bug Severity: <input className='detail-ip' value={bugDetails.severity} readOnly/> </h3>
                    <h3>Assigned To: <input className='detail-ip' value={bugDetails.assignedTo} readOnly/> </h3>
                    <h3>Bug Status: <input className= {`detail-ip ${bugDetails.status === 'Reported' ? 'red-text' : bugDetails.status === 'Assigned' ? 'yellow-text' : 'green-text'}`} value={bugDetails.status} readOnly/> </h3>
                    <h3>Created At: <input className='detail-ip' value={formatTime(bugDetails.createdAt)} readOnly/> </h3>
                    <h3>Updated At: <input className='detail-ip' value={formatTime(bugDetails.updatedAt)} readOnly/> </h3>
                    <h3>Remarks: <textarea className='detail-ip' value={bugDetails.remark} readOnly/> </h3>                    
                    <button onClick={handleChatClick} className='history-btn'>Chat</button>

                </div>
                <div className='right'>
                    <h3>File Attached:</h3> {bugDetails.fileAttached && ( <img src={bugDetails.fileAttached} alt='File Attached' className='flex' height='300' />)}
                    <h3>Update History</h3>{ console.log(bugDetails.updateHistory)}
                    <ol>
                        {bugDetails.updateHistory.slice(0,2).map((update) => (
                            <li key={update._id} className='order-item'>
                                <div>
                                    <strong>Updated By:</strong> {update.updatedBy} 
                                </div>
                                <div>
                                    <strong>Timestamp:</strong> {formatTime(update.updatedAt)}
                                </div>
                                <div>
                                    <p> <strong>Title:</strong> {update.previousData.title} </p>
                                    <p> <strong>Description:</strong> {update.previousData.description} </p>
                                    <p> <strong>Severity:</strong> {update.previousData.severity} </p>
                                    <p> <strong>Assigned to:</strong> {update.previousData.assignedTo} </p>
                                    <p> <strong>Status:</strong> {update.previousData.status} </p>
                                    <p> <strong>CreatedAt:</strong> {formatTime(update.previousData.createdAt)} </p>
                                    <p> <strong>UpdatedAt:</strong> {formatTime(update.previousData.updatedAt)} </p>
                                </div>
                                {/* <button onClick={() => revertToVersion(update._id)}>Revert to this Version</button> */}
                            </li>
                        ))}
                        <button className='history-btn' onClick={() => handleHistoryClick(reportId)}>See Full History</button>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default BugDetails;
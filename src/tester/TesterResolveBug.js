import { useState, useEffect } from 'react';
import '../admin/EditBugReport.css';
import axios from 'axios';

// Define the component
const TesterResolveBug = ({ report, onSave, onClose }) => {
    // State for the edited report details
    const [status, setStatus] = useState(report.status);   
    const [remark, setRemark] = useState(report.remark);   

    // Function to handle saving changes to the report
    const handleSave = () => {
        // Update the report details in the database
        // Call the onSave callback with the updated report details
        onSave({
            ...report,
            status: status,
            remark: remark
        });
    };

    return (
        <div className="modal flex">
            <div className="modalContent">
                <h2>Edit Bug Report</h2>
                <p>Title: {report.title}</p>
                <p>Description: {report.description}</p>
                <p>Severity: {report.severity}</p>
                <p>Status: 
                    <select className='severity' value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Assigned" disabled>Assigned</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Reverted">Reverted</option>
                    </select>
                </p>
                <p>Remark:
                    <textarea className='severity' value={remark} onChange={(e) => setRemark(e.target.value)}/>
                </p>
                {/* Save and Cancel buttons */}
                <button onClick={handleSave} className='edit Btn1'>Save</button><br/>
                <button onClick={onClose} className='edit Btn2'>Cancel</button>
            </div>
        </div>
    );
};

export default TesterResolveBug;
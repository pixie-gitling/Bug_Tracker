import { useState, useEffect } from 'react';
import './EditBugReport.css';
import axios from 'axios';
import Cookies from 'js-cookie'

// Define the component
const EditBugReportModal = ({ report, onSave, onClose, role }) => {
    // State for the edited report details
    const [severity, setSeverity] = useState(report.severity);
    const [assignedTo, setAssignedTo] = useState(report.assignedTo);
    const [status, setStatus] = useState(report.status);
    const [remark, setRemark] = useState(report.remark);
    const [testers, setTesters] = useState([]);
    const username = Cookies.get('username')

    // Fetch the list of testers from the database
    useEffect(() => {
        const fetchTesters = async () => {
            try {
                const response = await axios.get('/users');
                const testers = response.data.filter(users => users.role === "Tester");
                setTesters(testers);
            } catch (error) {
                console.error('Error fetching testers:', error);
            }
        };
    
        fetchTesters();
    }, []);    

    // Function to handle saving changes to the report
    const handleSave = async() => {
        // Update the report details in the database
        // Call the onSave callback with the updated report details
        onSave({
            ...report,
            severity: severity,
            assignedTo: assignedTo,
            status: status,
            remark: remark
        });

        // Send notification
        await axios.post('/notification/notifications', {
            message: 'Bug Report Updated by Admin',
            type: 'update',
            time: new Date().toISOString(),
            redirect: '/assignedbugs',
            sender: username
        });
    };

    return (
        <div className="modal flex">
            <div className="modalContent">
                <h2>Edit Bug Report</h2>
                <p>Title: {report.title}</p>
                <p>Description: {report.description}</p>
                <p>Severity: 
                    <select className='severity' value={severity} onChange={(e) => setSeverity(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </p>
                <p>Assigned To: 
                    <select className='severity' value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                        <option value="Not Assigned">Select Tester</option>
                        {testers.map(tester => (
                            <option key={tester._id} value={tester.username}>{tester.username}</option>
                        ))}
                    </select>
                </p>
                <p>Status: 
                    <select className='severity' value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Reported">Reported</option>
                        <option value="Assigned">Assigned</option>
                    </select>
                </p>
                <p>Remark:
                        <textarea className='severity' value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
                </p>
                {/* Save and Cancel buttons */}
                <button onClick={handleSave} className='edit Btn1'>Save</button><br/>
                <button onClick={onClose} className='edit Btn2'>Cancel</button>
            </div>
        </div>
    );
};

export default EditBugReportModal;
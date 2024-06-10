import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './AdminDisplayReports.css';

const AdminDisplayUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users');
                setUsers(response.data);
            } catch (error) {
                toast.error('Error Fetching Users');
                console.error('Error Fetching Users:', error);
            }
        };

        fetchUsers();
    }, []);

    // const handleDeleteUser = async (userId) => {
    //     try {
    //         if (window.confirm('Are you sure you want to delete this user?')) {
    //             const response = await axios.delete(`/users/${userId}`);
    //             if (response.status === 200) {
    //                 setUsers(users.filter(user => user._id !== userId));
    //                 toast.success('User deleted successfully');
    //             } else {
    //                 toast.error('Error deleting user');
    //             }
    //         }
    //     } catch (error) {
    //         toast.error('Error deleting user');
    //         console.error('Error Deleting User:', error);
    //     }
    // };    

    return (
        <div className='displayUsers flex'> 
            <div className='User-Table'> 
                <table>
                    <thead className='tableHead'>
                        <tr className='flex'>
                            <th>Profile Picture</th> 
                            <th>Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            {/* <th>Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className='flex'>
                                <td>
                                    {user.image && (
                                        <img src={user.image} alt='Profile' className='user-profile-image' />
                                    )}
                                </td> 
                                <td>{user.name}</td> 
                                <td>{user.username}</td> 
                                <td>{user.role}</td> 
                                {/* <td>
                                    <button className='Table-Btn Btn2 flex' onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDisplayUsers;
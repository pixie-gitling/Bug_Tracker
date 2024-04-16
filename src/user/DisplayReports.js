import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import './DisplayReports.css'

const DisplayReports = () => {

    const [reports, setReports] = useState([])

    useEffect(() => {
        try {
            const fetchReports = async() =>{
                const response = await axios.get('/report')
                setReports(response.data)
            }

            fetchReports()
        } catch (error) {
            toast.error("Error Fetching Reports")
            console.log(error);
        }
    })

  return (
    <div className='DisplayReports flex'>
        <div className='bug-table'>
            <table>
                    <thead>
                        <tr className='flex'>
                            <th>Bug Title</th>
                            <th>Bug Description</th>
                            <th>File Attached</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report._id} className='flex'>
                                <td>{report.title}</td>
                                <td>{report.description}</td>
                                <td>
                                    {/* {report.fileAttached && (
                                        <img src={`data:image/jpeg;base64,${report.fileAttached}`} alt='File Attached' height='100px' width='100px'/>
                                    )} */}
                                    File Attached
                                </td>
                                <td> 
                                    <button className='table-btn btn1 flex'>Edit</button> <br/>
                                    <button className='table-btn btn2 flex'>Delete</button> 
                                </td>
                            </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default DisplayReports
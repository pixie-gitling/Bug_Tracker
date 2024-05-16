import React, { useEffect, useState } from 'react'
import '../admin/AdminDashboard.css'
import axios from 'axios'
import Cookies from 'js-cookie'

const TesterDashboard = () => {

    const [totalBugs, setTotalBugs] = useState(0)
    const [resolvedBugs, setResolvedBugs] = useState(0)
    const [assignedBugs, setAssignedBugs] = useState(0)
    const username = Cookies.get('username')

    useEffect(() => {
        const fetchBugReports = async() => {
            const response = await axios.get('/report')
            const filteredReports = response.data.filter(report => report.assignedTo === username);

            setTotalBugs(filteredReports.length)
            setAssignedBugs(filteredReports.filter(report => report.status === 'Assigned').length)
            setResolvedBugs(filteredReports.filter(report => report.status === 'Resolved').length)
        }

        fetchBugReports()
    })

  return (
    <div className='admin'>
            <div className='DashItems'>
                <div className='Card'>
                    <div className='CardItems'>
                        <div className='CardHeading'>
                            <h1>Total Bugs Assigned</h1>
                        </div>
                        <div className='CardData'>
                            <h1>{totalBugs}</h1>
                        </div>
                    </div>
                </div>
                <div className='Card'>
                    <div className='CardItems'>
                        <div className='CardHeading'>
                            <h1>No. of Bugs Resolved</h1>
                        </div>
                        <div className='CardData'>
                            <h1>{resolvedBugs}</h1>
                        </div>
                    </div>
                </div>
                <div className='Card'>
                    <div className='CardItems'>
                        <div className='CardHeading'>
                            <h1>No. of Bugs Unresolved</h1>
                        </div>
                        <div className='CardData'>
                            <h1>{assignedBugs}</h1>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
  )
}

export default TesterDashboard
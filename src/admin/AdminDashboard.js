import React from 'react'
import '../user/Dashboard.css'

const AdminDashboard = () => {
  return (
    <div className='AdminDashboard'>
        <div className='dash-items'>
            <div className='card'>
                <div className='card-items'>
                    <div className='card-heading'>
                        <h1>Total Bugs Reported</h1>
                    </div>
                    <div className='card-data'>
                        <h1>0</h1>
                    </div>
                </div>
            </div>
            <div className='card'>
                <div className='card-items'>
                    <div className='card-heading'>
                        <h1>No. of Bugs Resolved</h1>
                    </div>
                    <div className='card-data'>
                        <h1>0</h1>
                    </div>
                </div>
            </div>
            <div className='card'>
                <div className='card-items'>
                    <div className='card-heading'>
                        <h1>No. of Bugs Unresolved</h1>
                    </div>
                    <div className='card-data'>
                        <h1>0</h1>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default AdminDashboard
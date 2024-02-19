import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div className='sidenavbar'>
            <h2>Username</h2>
            <div className="sidenav">
                <Link to="/staff/students"><button>Students</button></Link>
                <Link to="/staff/events"><button>Events</button></Link>
                <Link to="/staff/feedback"><button>Feedback</button></Link>
                <Link to="/signout"><button>Sign Out</button></Link>
            </div>
        </div>
    )
}

export default Dashboard

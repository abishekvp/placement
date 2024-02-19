import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div className='sidenavbar'>
            <h2>Username</h2>
            <div className="sidenav">
                <Link to="/student/profile"><button>Profile</button></Link>
                <Link to="/student/companies"><button>Companies</button></Link>
                <Link to="/student/feedback"><button>Feedback</button></Link>
                <Link to="/student/review"><button>Review</button></Link>
                <Link to="/signout"><button>Sign Out</button></Link>
            </div>
        </div>
    )
}

export default Dashboard

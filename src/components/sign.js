import React from 'react'
import { Link } from 'react-router-dom'

function sign() {
  return (
    <div className="sign">
      <Link to="/staff/signin">
        <button>Staff</button>
      </Link>
      <br />
      <Link to="/student/signin">
        <button>Student</button>
      </Link>
    </div>
  )
}

export default sign
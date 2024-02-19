import React from 'react';
import Navbar from './navbar';
import Studentsnav from './studentsnav';


const Eligible = () => {
  const students = [
    { name: 'John Doe', rollNumber: '123', batch: '2022', degree: 'B.Tech', branch: 'Computer Science', phone: '1234567890', email: 'john.doe@example.com' },
    { name: 'Jane Smith', rollNumber: '456', batch: '2022', degree: 'B.Tech', branch: 'Electrical Engineering', phone: '9876543210', email: 'jane.smith@example.com' },
  ];

  return (
    <div>
      <h1></h1>
      <Navbar/>
      <div className='container'>
        <Studentsnav/>
        <h2>Eligible Students</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Batch</th>
              <th>Degree</th>
              <th>Branch</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.rollNumber}</td>
                <td>{student.batch}</td>
                <td>{student.degree}</td>
                <td>{student.branch}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Eligible;

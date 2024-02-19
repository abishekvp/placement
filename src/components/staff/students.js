import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Studentsnav from './studentsnav';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../../firebase';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsRef = firebaseApp.firestore().collection('Student');
      const snapshot = await studentsRef.get();
      const studentsData = snapshot.docs.map((doc) => doc.data());
      setStudents(studentsData);
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <Navbar/>
      <div className='container'>
        <Studentsnav/>
        <br/>
        <Link to="/staff/addstudent"><button>Add Student</button></Link>
        <br/>
        <h2>Total Students</h2>
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

export default Students;

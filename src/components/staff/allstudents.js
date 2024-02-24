import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Studentsnav from './studentsnav';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../../firebase';

// import firebase from 'firebase/app';
// import 'firebase/firestore';

const AllStudents = () => {
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
    <section>
      <Navbar/>
      <div className='container'>
        <Studentsnav/>
       
        <h2>Total Students</h2>
        <Link to="/staff/addstudent"><button>Add Student</button></Link>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>Roll Number</th> */}
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
                {/* <td>{student.rollnumber}</td> */}
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
    </section>
  );
};

export default AllStudents;

import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Studentsnav from './studentsnav';
import { firebaseApp } from '../../firebase';

const Placed = () => {
  const [placedStudents, setPlacedStudents] = useState([]);

  useEffect(() => {
    // Fetch placed students from Firestore
    const fetchPlacedStudents = async () => {
      try {
        const querySnapshot = await firebaseApp.firestore().collection('Student').where('placed', '==', 'Yes').get();
        const students = querySnapshot.docs.map(doc => doc.data());
        setPlacedStudents(students);
      } catch (error) {
        console.error('Error fetching placed students:', error);
      }
    };

    fetchPlacedStudents();
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div>
      <h1></h1>
      <Navbar />
      <div className='container'>
        <Studentsnav />
        <h2>Placed Students</h2>
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
            {placedStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.rollnumber}</td>
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

export default Placed;

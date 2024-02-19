import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Studentsnav from './studentsnav';
import { firebaseApp } from '../../firebase';

const Eligible = () => {
  const [eligibleStudents, setEligibleStudents] = useState([]);

  useEffect(() => {
    // Fetch eligible students from Firestore
    const fetchEligibleStudents = async () => {
      try {
        const querySnapshot = await firebaseApp.firestore().collection('Student').get();
        const students = querySnapshot.docs.map(doc => {
          const studentData = doc.data();
          // Convert arrearCount to a number
          const arrearCount = parseFloat(studentData.arrearCount);
          return { ...studentData, arrearCount };
        });
        // Filter students based on the condition
        const eligibleStudents = students.filter(student => student.arrearCount > 8.5);
        setEligibleStudents(eligibleStudents);
      } catch (error) {
        console.error('Error fetching eligible students:', error);
      }
    };

    fetchEligibleStudents();
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div>
      <h1></h1>
      <Navbar />
      <div className='container'>
        <Studentsnav />
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
            {eligibleStudents.map((student, index) => (
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

export default Eligible;

import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Studentsnav from './studentsnav';
import { firebaseApp } from '../../firebase';

const Eligible = () => {
  const [eligibleStudents, setEligibleStudents] = useState([]);
  const [cgpaFilter, setCgpaFilter] = useState('');

  useEffect(() => {
    // Fetch eligible students from Firestore
    const fetchEligibleStudents = async () => {
      try {
        const querySnapshot = await firebaseApp.firestore().collection('Student').get();
        const students = querySnapshot.docs.map(doc => {
          const studentData = doc.data();
          // Convert arrearCount and cgpa to numbers
          const arrearCount = parseFloat(studentData.arrearCount);
          const cgpa = parseFloat(studentData.cgpa);
          return { ...studentData, arrearCount, cgpa };
        });

        // Filter students based on the condition
        let filteredStudents = students.filter(student => student.cgpa > 8);

        // Apply additional filter based on CGPA input
        if (cgpaFilter !== '') {
          const cgpaFilterValue = parseFloat(cgpaFilter);
          filteredStudents = filteredStudents.filter(student => student.cgpa > cgpaFilterValue);
        }

        setEligibleStudents(filteredStudents);
      } catch (error) {
        console.error('Error fetching eligible students:', error);
      }
    };

    fetchEligibleStudents();
  }, [cgpaFilter]); // Include cgpaFilter in the dependency array to update when the filter changes

  const handleCgpaChange = (e) => {
    // Update the CGPA filter when the input changes
    setCgpaFilter(e.target.value);
  };

  return (
    <div>
      <h1></h1>
      <Navbar />
      <div className='container'>
        <Studentsnav />
        <h2>Eligible Students</h2>
        <label>Filter by CGPA: </label>
      
        <input type='number' step='0.01' max='10' value={cgpaFilter} onChange={handleCgpaChange} />
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

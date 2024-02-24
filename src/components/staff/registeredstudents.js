import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Studentsnav from './studentsnav';
import { db } from '../../firebase';

const Registered = () => {
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  useEffect(() => {
    // Fetch registered students and unique company names when the component mounts
    fetchRegisteredStudents();
    fetchCompanyNames();
  }, []);

  const fetchRegisteredStudents = async () => {
    try {
      // Fetch students from the "Student" collection where the registered field is not empty
      const studentsSnapshot = await db.collection('Student').where('registered', '!=', []).get();
      const studentsData = studentsSnapshot.docs.map(doc => doc.data());
      setRegisteredStudents(studentsData);
    } catch (error) {
      console.error('Error fetching registered students:', error);
    }
  };

  const fetchCompanyNames = async () => {
    try {
      // Fetch unique company names from the "Events" collection
      const eventsSnapshot = await db.collection('Events').get();
      const eventsData = eventsSnapshot.docs.map(doc => doc.data());
      const uniqueCompanyNames = Array.from(new Set(eventsData.map(event => event.companyname)));
      setCompanyNames(uniqueCompanyNames);
    } catch (error) {
      console.error('Error fetching company names:', error);
    }
  };

  const handleCompanyChange = (e) => {
    // Update the selected company when the dropdown changes
    setSelectedCompany(e.target.value);
  };

  const filterStudentsByCompany = () => {
    // Filter the registered students based on the selected company name
    if (selectedCompany) {
      return registeredStudents.filter(student => student.registered.includes(selectedCompany));
    }
    return registeredStudents;
  };

  const filteredStudents = filterStudentsByCompany();

  return (
    <div>
      <Navbar />
      <div className='container'>
        <Studentsnav />

        <br />
        <h2>Registered Students</h2>
        <label>Filter by Company : </label>
        <select value={selectedCompany} onChange={handleCompanyChange}>
          <option value="" disabled>Select a company</option>
          {companyNames.map((company, index) => (
            <option key={index} value={company}>{company}</option>
          ))}
        </select>
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
            {filteredStudents.map((student, index) => (
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

export default Registered;

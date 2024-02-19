import React, { useEffect, useState } from 'react';
import { firebaseApp } from '../../firebase';
import Navbar from '../Navbar';
function Profile() {
  const [students, setStudents] = useState([]);

    useEffect(() => {
        const storedRollnumber = localStorage.getItem('rollnumber');
        console.log('Stored Rollnumber:', storedRollnumber);
        if (storedRollnumber) {
            fetchStudentProfile(storedRollnumber);
        }
    }, []);

    const fetchStudentProfile = async (rollnumber) => {
        try {
            const studentData = await getStudentData(rollnumber);
            setStudents([studentData]);
            console.log('Student Profile:', studentData);
        } catch (error) {
            console.error('Error fetching student profile:', error);
        }
    };

    const getStudentData = async (rollnumber) => {
      try {
          const studentDoc = await firebaseApp.firestore().collection('Student').doc(rollnumber).get();
  
          if (studentDoc.exists) {
              const studentData = studentDoc.data();
              
              return studentData;
          } else {
              console.log('Student not found in Firestore.');
              return null;
          }
      } catch (error) {
          console.error('Error fetching student data from Firestore:', error);
          return null;
      }
  };
  

    return (
        <div>
            <Navbar/>
            <h1>Student Profile</h1>
            <div>
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
}

export default Profile;

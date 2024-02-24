import React, { useEffect, useState } from 'react';
import { firebaseApp } from '../../firebase';
import Navbar from './navbar';

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
              console.log('Student data:', studentData);
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
            <div className='container'>
                <h2>Student Profile</h2>
                <div className='events_'>
                    {students.map((student, index) => (
                    <div key={index}>
                        <p>Name : {student.name}</p>
                        <p>Roll Number : {student.rollnumber}</p>
                        <p>Batch : {student.batch}</p>
                        <p>Degree : {student.degree}</p>
                        <p>Branch : {student.branch}</p>
                        <p>Phone : {student.phone}</p>
                        <p>Email : {student.email}</p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;

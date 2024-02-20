import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Studentsnav from './studentsnav';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../../firebase';

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
      </div>
    </div>
  );
};

export default Students;

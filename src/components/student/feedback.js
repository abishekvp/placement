import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import { firebaseApp, db } from '../../firebase';

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [registeredCompanies, setRegisteredCompanies] = useState([]);

  useEffect(() => {
    const rollnumber = localStorage.getItem('rollnumber');
    if (rollnumber) {
      fetchRegisteredCompanies(rollnumber);
    }
  }, []);

  const fetchRegisteredCompanies = async (rollnumber) => {
    try {
      const studentDoc = await db.collection('Student').doc(rollnumber).get();
      const studentData = studentDoc.exists ? studentDoc.data() : null;

      if (studentData && studentData.registered) {
        setRegisteredCompanies(studentData.registered);
        fetchFeedback(studentData.registered);
      }
    } catch (error) {
      console.error('Error fetching registered companies:', error);
    }
  };

  const fetchFeedback = async (registeredCompanies) => {
    try {
      const feedbackPromises = registeredCompanies.map(async (companyname) => {
        // Fetch details from the Events collection based on companyname
        const eventDoc = await db.collection('Events').doc(companyname).get();
        const eventData = eventDoc.exists ? eventDoc.data() : null;

        return {
          companyname: companyname,
          role: eventData ? eventData.role : 'Role not available',
          category: eventData ? eventData.category : 'Category not available',
          degree: eventData ? eventData.degree : 'Degree not available',
          batch: eventData ? eventData.batch : 'Batch not available',
          branch: eventData ? eventData.branch : 'Branch not available',
          date: eventData ? eventData.date : 'Date not available',
        };
      });

      const feedbackResults = await Promise.all(feedbackPromises);
      setFeedbackData(feedbackResults);
      console.log('Feedback:', feedbackResults);
      
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1>Feedback</h1>
        <br /><br />
        <div className='upcomingevents'>
          {feedbackData.map((feedback, index) => (
            <div key={index} className='events_'>
              <p>{feedback.companyname}</p>
              <p>{feedback.role}, {feedback.category}</p>
              <p>Degree : {feedback.degree}</p>
              <p>Batch : {feedback.batch}</p>
              <p>Branch : {feedback.branch}</p>
              <p>Drive Date: {feedback.date}</p>
              <Link to={{ pathname: `/student/${feedback.companyname}/${index}/fillout` }}>
                <button>Fill Out</button>
              </Link>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feedback;

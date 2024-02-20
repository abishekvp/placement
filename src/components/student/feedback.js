import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import { firebaseApp, db } from '../../firebase';

function Feedback() {
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
        const feedbackDoc = await db.collection('Feedback').doc(companyname).get();
        return feedbackDoc.exists ? feedbackDoc.data() : null;
      });

      const feedbackResults = await Promise.all(feedbackPromises);
      setFeedbackData(feedbackResults.filter(data => data !== null));
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

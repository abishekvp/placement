import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import { firebaseApp, db } from '../../firebase';

function Companies() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsCollection = db.collection('Events');
      const snapshot = await eventsCollection.get();
      const eventData = snapshot.docs.map(doc => doc.data());
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleApply = async (companyName) => {
    try {
      // Get the rollnumber from local storage
      const rollnumber = localStorage.getItem('rollnumber');
  
      // Update the Student collection with the applied company
      const studentRef = db.collection('Student').doc(rollnumber);
  
      // Use a transaction to ensure data consistency
      await db.runTransaction(async (transaction) => {
        const studentData = await transaction.get(studentRef);
  
        // Check if 'registered' field exists and initialize if it doesn't
        const registeredCompanies = studentData.data()?.registered || [];
  
        // Check if the company is already in the 'registered' array
        if (!registeredCompanies.includes(companyName)) {
          // If not, add the company to the array
          registeredCompanies.push(companyName);
  
          // Update the 'registered' field in the Firestore document
          transaction.update(studentRef, { registered: registeredCompanies });
  
          alert('Successfully applied for ' + companyName);
          console.log(`Successfully applied for ${companyName}`);
        } else {
          // If the company is already in the array, show a message
          alert(`You have already applied for ${companyName}`);
        }
      });
    } catch (error) {
      console.error('Error applying for company:', error);
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1>Companies</h1>
        <br /><br />
        <div className='upcomingevents'>
          {events.map((event, index) => (
            <div key={index} className='events_'>
              <p>{event.companyname}</p>
              <p>{event.role}, {event.category}</p>
              <p>Degree: {event.degree}</p>
              <p>Batch: {event.batch}</p>
              <p>Branch: {event.branch}</p>
              <p>Drive Date: {event.date}</p>
              <button onClick={() => handleApply(event.companyname)}>Apply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Companies;

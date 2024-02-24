import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import { firebaseApp, db } from '../../firebase';

function Feedback() {
  const [events, setEvents] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchFeedback();
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

  const fetchFeedback = async () => {
    try {
      const feedbackCollection = db.collection('Feedback');
      const snapshot = await feedbackCollection.get();
      const feedbackData = snapshot.docs.map(doc => doc.data());
      setFeedbackData(feedbackData);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handlePostFeedback = async () => {
    if (selectedCompany) {
      try {
        // Create a new document in the "Feedback" collection with the selected company name
        await db.collection('Feedback').doc(selectedCompany).set({
          companyname: selectedCompany,
          feedback: "",
        });

        // Fetch updated feedback data after posting
        fetchFeedback();
        alert('Feedback posted successfully!');
        console.log('Feedback posted successfully!');
      } catch (error) {
        console.error('Error posting feedback:', error);
      }
    } else {
      console.error('Please select a company and provide feedback content.');
    }
  };

  const handleDeleteFeedback = async (id) => {
    try {
      // Delete the document with the specified ID from the "Feedback" collection
      await db.collection('Feedback').doc(id).delete();
      alert('Feedback deleted successfully!');
      console.log('Feedback deleted successfully!');
      // Fetch updated feedback data after deletion
      fetchFeedback();
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1>Feedback</h1>
        <br/><br/>
        <div>
          <label>Select a  Company : </label>
          <select  className={'inputBox'} value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
            <option value="" disabled> Select Company </option>
            {events.map((event, index) => (
              <option key={index} value={event.companyname}>{event.companyname}</option>
            ))}
          </select>
          <br/>
          <br/>
          <button type="button" onClick={handlePostFeedback}>Post Feedback</button>
        </div>
        <div className='upcomingevents'>
  
          {/* Display other events */}
          <h2>Feedback Data</h2>
          {feedbackData.map((feedback, index) => (
            <div key={index} className='events_'>
              <p>Company Name: {feedback.companyname}</p>
              <Link to={`/staff/view/${feedback.companyname}`}><button>View</button></Link>
              <button onClick={() => handleDeleteFeedback(feedback.companyname)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feedback;

import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { firebaseApp } from '../../firebase'; // Import your Firebase configuration

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsCollection = firebaseApp.firestore().collection('Events');
      const snapshot = await eventsCollection.get();
      const eventData = snapshot.docs.map(doc => doc.data());
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
 
  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1>Upcoming Events</h1>
        <Link to="/staff/addevent">
          <button>Add Event</button>
        </Link>
        <br /><br />
        <div className='upcomingevents'>
          {events.map((event, index) => (
            <div key={index} className='events_'>
              <p>{event.companyname}</p>
              <p>{event.role}, {event.category}</p>
              <p>Degree : {event.degree}</p>
              <p>Batch : {event.batch}</p>
              <p>Branch : {event.branch}</p>
              <p>Drive Date: {event.date}</p>
              <button onClick={() => navigate(`/apply/${event.companyname}`)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;

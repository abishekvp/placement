import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Events() {
  const events = [
    { companyName: 'Tata Consultancy Services', degree: 'BE', batch: '2020', branch: 'CSE', role: 'Web Developer', date: '20-02-2023', category:'Super Dream' },
    { companyName: 'Infocys Private Limited', degree: 'B.Tech', batch: '2020', branch: 'CCE', role: 'Junior Software Trainee', date: '21-02-2023', category:'Dream Offer' },
    { companyName: 'Tata Consultancy Services', degree: 'BE', batch: '2020', branch: 'CSE', role: 'Web Developer', date: '20-02-2023', category:'Super Dream' },
    { companyName: 'Infocys Private Limited', degree: 'B.Tech', batch: '2020', branch: 'CCE', role: 'Software Trainee', date: '21-02-2023', category:'Dream Offer' },
    { companyName: 'Tata Consultancy Services', degree: 'BE', batch: '2020', branch: 'CSE', role: 'Web Developer', date: '20-02-2023', category:'Super Dream' },
  ];
  const [setEvents] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/staff/api/events'); // Replace '/api/events' with your actual API endpoint
      const data = await response.json();
      setEvents(data);
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
        <br/><br/>
        <div className='upcomingevents'>
          {events.map((event, index) => (
            <div key={index} className='events_'>
              <p>{event.companyName}</p>
              <p>{event.role}, {event.category}</p>
              <p>Degree : {event.degree}</p>
              <p>Batch : {event.batch}</p>
              <p>Branch : {event.branch}</p>
              <p>Drive Date: {event.date}</p>
              <Link to={{ pathname: `/apply/${index}` }}><button>Apply</button></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;

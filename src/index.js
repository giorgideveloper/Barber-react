import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppBooking from './App_booking';
import AppCalendar from './App_calendar';

const booking = ReactDOM.createRoot(document.getElementById('booking'));
booking.render(<AppBooking />);

const calendar = ReactDOM.createRoot(document.getElementById('calendar'));
calendar.render(<AppCalendar />);

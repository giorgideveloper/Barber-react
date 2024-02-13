import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppBooking from './App_booking';
import AppCalendar from './App_calendar';

const bookingEl = document.getElementById('booking');
if (bookingEl) {
	const booking = ReactDOM.createRoot(document.getElementById('booking'));
	booking.render(<AppBooking />);
}

const calendarEl = document.getElementById('calendar');
if (calendarEl) {
	const calendar = ReactDOM.createRoot(document.getElementById('calendar'));
	calendar.render(<AppCalendar />);
}

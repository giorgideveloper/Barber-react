import React from 'react';
import BookingDay from './bookingDay.jsx';
import BookingBarber from './bookingBarber.jsx';
import BookingHours from './bookingHours.jsx';

function BookingCreate() {
	return (
		<div className='container'>
			<div className='row g-1'>
				<div className='col-12 col-md-6 mt-3'>
					{' '}
					<BookingBarber />
				</div>

				<div className='col-12 col-md-6 mt-3'>
					{' '}
					<BookingDay />
				</div>
				{/* <div className='col-12 col-md-6 '>
					{' '}
					<BookingHours />
				</div> */}
			</div>
		</div>
	);
}

export default BookingCreate;

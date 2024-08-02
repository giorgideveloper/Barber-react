import React, { useState } from 'react';
import BookingBarber from './bookingBarber.jsx';
import BookingDate from '../booking/bookingDate.jsx';

function BookingCreate() {
	const [day, setDay] = useState('');
	const [freeHour, setFreeHour] = useState('');
	const allTime = freeHour.split();
	console.log(allTime);
	return (
		<form className='d-flex'>
			<div className='container'>
				<div className='row g-1'>
					<div className='col-12 col-md-6 mt-3'>
						{' '}
						<BookingBarber />
					</div>

					<div className='col-12 col-md-6 '>
						{' '}
						<BookingDate
							setDay={setDay}
							setFreeHour={setFreeHour}
							type='checkbox'
						/>
					</div>
				</div>
				<div className='row g-1 justify-content-center'>
					<div className='col-12 col-md-6'>
						<input
							type='text'
							className='form-control from-inputs shadow-sm w-75'
							id='validationDefault01'
							placeholder={'სახელი'}
							name='customer_name'
							required
						/>
					</div>
					<div className='col-12 col-md-6 mt-2'>
						<button className='btn' type='button'>
							10:00 - 19:00
						</button>
					</div>
				</div>
				<div className='row justify-item-center'>
					<div className='col-12 justify-content-center mt-5 mb-3'>
						<button type='button' className='btn'>
							ჯავშანის ჩახურვა
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default BookingCreate;

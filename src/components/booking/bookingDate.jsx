import React, { forwardRef, useEffect, useState } from 'react';
import 'flatpickr/dist/flatpickr.css';
import { bookingTime } from '../../api/api.js';
import moment from 'moment';
import Hours from './hours.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingDate({ setFreeHour, setDay, barberId }) {
	const [timeBooking, setTimeBooking] = useState([]);
	const [time, setTime] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	// eslint-disable-next-line react/display-name
	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
		<button
			type='button'
			className='example-custom-input'
			onClick={onClick}
			ref={ref}
			required
		>
			{value}
		</button>
	));
	useEffect(() => {
		setTime(moment(startDate).format().slice(-30, -15));
	}, [startDate]);
	const language = localStorage.getItem('selectedLanguage');

	//Get barberId
	useEffect(() => {
		const fetchTime = async () => {
			try {
				if (barberId) {
					const response = await bookingTime(time, barberId);
					if (response.status === 200) {
						setTimeBooking(response.data.results);
					} else {
						console.log('error bookingTime');
					}
				}
			} catch (err) {
				console.log(err);
			}
		};
		setDay(time);
		fetchTime();
	}, [time, barberId, setDay]);

	return (
		<div>
			<h4 className='solid'>
				{(language === 'ru'
					? 'Выберите дату'
					: language === 'ka'
					? 'აირჩიე დრო'
					: ''
				).toString()}
			</h4>
			<div className='row g-1'>
				<div className='col-12 col-xl-12 '>
					<DatePicker
						selected={startDate}
						onChange={date => setStartDate(date)}
						minDate={new Date()}
						dateFormat='MMMM d, yyyy'
						withPortal
						customInput={<ExampleCustomInput />}
						required
					/>
				</div>
				<div className='col-12 col-xl-12'>
					{' '}
					<Hours bookings={timeBooking} setFreeHour={setFreeHour} />
				</div>
			</div>
		</div>
	);
}

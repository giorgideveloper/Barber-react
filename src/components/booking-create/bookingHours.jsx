// import React, { useEffect, useState } from 'react';
// import { bookingTime, workingHours } from '../../api/api.js';
// import DisabledTooltip from './tooltip.jsx';
// import moment from 'moment';
// export default function BookingHours() {
// 	const [hours, setHours] = useState([]);
//   const [timeBooking, setTimeBooking] = useState([]);
// 	const [time, setTime] = useState('');
// 	const [startDate, setStartDate] = useState(new Date());
//   	useEffect(() => {
// 			setTime(moment(startDate).format().slice(-30, -15));
// 		}, [startDate]);

// //Get barberId
// 	useEffect(() => {
// 		const fetchTime = async () => {
// 			try {
// 				if (barberId) {
// 					const response = await bookingTime(time, barberId);
// 					if (response.status === 200) {
// 						setTimeBooking(response.data.results);
// 					} else {
// 						console.log('error bookingTime');
// 					}
// 				}
// 			} catch (err) {
// 				console.log(err);
// 			}
// 		};
// 		setDay(time);
// 		fetchTime();
// 	}, [time, barberId, setDay]);

// 	useEffect(() => {
// 		const fetchTime = async () => {
// 			try {
// 				const response = await workingHours();
// 				if (response.status === 200) {
// 					setHours(response.data.results);
// 				} else {
// 					console.log('error workingHours');
// 				}
// 			} catch (err) {
// 				console.log(err);
// 			}
// 		};
// 		fetchTime();
// 	}, []);

// 	let finalBookings = [];

// 	//Get Day month year
// 	const currentDate = moment();

// 	// Format the date as YYYY-MM-DD
// 	const formattedDate = currentDate.format('YYYY-MM-DD');

// 	// Get Hours
// 	const formattedTime = currentDate.format('HH:mm:ss');

// 	for (const hour in hours) {
// 		let isBooked = false;
// 		if (formattedDate === time) {
// 			if (hours[hour].time <= formattedTime) {
// 				isBooked = true;
// 			}
// 		}
// 		for (const booking in bookings) {
// 			if (hours[hour].time === bookings[booking].time_for_booking) {
// 				isBooked = true;
// 			}
// 		}

// 		finalBookings.push({
// 			id: hours[hour].id,
// 			time: hours[hour].time,
// 			booked: isBooked,
// 		});
// 	}
// 	return (
// 		<div>
// 			<div className='mt-3 hours-checkbox'>
// 				<h4 className='solid'>აირჩიე დრო</h4>
// 				{finalBookings &&
// 					finalBookings?.map((booking, index) => (
// 						// eslint-disable-next-line react/jsx-key
// 						<div className='d-inline ' key={index}>
// 							<DisabledTooltip
// 								booking={booking}

// 								index={index}
// 							/>
// 						</div>
// 					))}
// 			</div>
// 		</div>
// 	);
// }

import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { allBarber, service, usersBookings, workingHours } from '../api/api.js';
const localizer = momentLocalizer(moment);

export default function BigCalendar() {
	const [booking, setBookings] = useState([]);
	const [barber, setBarbers] = useState([]);
	const [barberService, setBarberService] = useState([]);
	const [workingTime, setWorkingTime] = useState([]);
	const [page, setPage] = useState(0);

	//Get all booking users
	const getBookingFc = async () => {
		//Todo Pagination error
		try {
			const res = await usersBookings();
			if (res.status === 200) {
				setBookings(res.data.results);
			}
		} catch (error) {
			throw error;
		}
	};

	// Get barbers
	const getBarbers = async () => {
		try {
			const res = await allBarber();
			if (res.status === 200) {
				setBarbers(res.data.results);
			}
		} catch (error) {
			throw error;
		}
	};

	// Get barber service
	const getService = async () => {
		try {
			const res = await service();
			setBarberService(res.data.results);
		} catch (error) {
			throw error;
		}
	};

	// Get all working time
	const getWorkingTime = async () => {
		const res = await workingHours();
		try {
			if (res.status === 200) {
				setWorkingTime(res.data.results);
			}
		} catch (error) {
			throw error;
		}
	};
	useEffect(() => {
		getBookingFc();
		getBarbers();
		getService();
		getWorkingTime();
	}, []);

	if (booking) {
		for (const b in booking) {
			for (const n in barber) {
				if (booking[b].service === barber[n].id) {
					booking[b].barbery = barber[n].barber_name;
				}
			}
		}

		for (const b in booking) {
			for (const n in barberService) {
				if (booking[b].service === barberService[n].id) {
					booking[b].service = barberService[n].service_name;
				}
			}
		}
		for (const b in booking) {
			for (const n in workingTime) {
				if (booking[b].time === workingTime[n].id) {
					booking[b].time = workingTime[n].time;
				}
			}
		}
	}
	return (
		<div>
			<Calendar
				localizer={localizer}
				events={booking}
				titleAccessor={booking =>
					`${booking.barbery} - ${booking.service} - ${booking.time} - ${booking.customer_phone} `
				}
				startAccessor={booking => new Date(booking.date)}
				endAccessor={booking => new Date(booking.date)}
				style={{ height: 500 }}
			/>
		</div>
	);
}

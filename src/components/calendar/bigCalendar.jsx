import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
	allBarber,
	csrfBookings,
	service,
	usersBookings,
	workingHours,
} from '../../api/api.js';
import kaKA from 'date-fns/locale/ka/_lib/localize/index.js';
import ModalCalendar from './modalCalendar.jsx';
import Canvase from './Canvase.jsx';

const locales = {
	// eslint-disable-next-line no-undef
	'ka-KA': kaKA,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

// const localizer = momentLocalizer(moment);

export default function BigCalendar() {
	const [booking, setBookings] = useState([]);
	const [barber, setBarbers] = useState([]);
	const [barberService, setBarberService] = useState([]);
	const [workingTime, setWorkingTime] = useState([]);
	const [user, setUser] = useState();
	const [modalShow, setModalShow] = useState(false);
	const [csrf, setCsrf] = useState('');
	// get csrfToken
	useEffect(() => {
		const getCsrf = async () => {
			const res = await csrfBookings();
			setCsrf(res);
		};
		getCsrf();
	}, []);

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

	const eventsWithDateTime = booking.map(booking => ({
		...booking,
		datetime: new Date(`${booking.date}T${booking.time}`),
	}));

	const onSelectEvent = calEvent => {
		setUser(calEvent);
		setModalShow(true);
	};
	return (
		<div>
			<div className='container-fluid'>
				<div className='row mt-5'>
					{modalShow ? (
						<div className='col-12'>
							<ModalCalendar
								user={user}
								show={modalShow}
								onHide={() => setModalShow(false)}
								getBookingFc={getBookingFc}
								csrf={csrf}
							/>
						</div>
					) : (
						''
					)}
					<div className='row g-1 justify-content-end'>
						{' '}
						<div className='col-md-3 text-end '>
							<Canvase
								getBookingFc={getBookingFc}
								user={user}
								eventsWithDateTime={eventsWithDateTime}
							/>
						</div>
					</div>

					<div className='col-12'>
						<Calendar
							localizer={localizer}
							events={eventsWithDateTime}
							titleAccessor={booking =>
								`${
									booking.read ? (
										''
									) : (
										<span class='badge bg-secondary'>New</span>
									)
								}${booking.barbery} - ${booking.service} - ${booking.date} - ${
									booking.time
								} - ${booking.customer_phone}`
							}
							startAccessor={booking => booking.datetime}
							endAccessor={booking => booking.datetime}
							style={{ height: 500 }}
							popup={true}
							onSelectEvent={onSelectEvent}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

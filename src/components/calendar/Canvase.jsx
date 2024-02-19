import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
	allBarber,
	usersBookings,
	usersBookingsId,
	usersBookingsPut,
} from '../../api/api';
import ModalCalendar from './modalCalendar.jsx';
import Notification from './notification.jsx';
// const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
// 	<button
// 		type='button'
// 		className='example-custom-input'
// 		onClick={onClick}
// 		ref={ref}
// 		required
// 	>
// 		{value}
// 	</button>
// ));

function Canvase({ eventsWithDateTime, getBookingFc, csrf }) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [modalShow, setModalShow] = useState(false);
	const [user, setUser] = useState({ id: null /* other properties */ });
	const [userParsed, setUserParsed] = useState('');
	const [barber, setBarbers] = useState([]);
	const [allBooking, setAllBooking] = useState([]);

	const handleOpen = async booking => {
		if (booking) {
			await fetchHandle(booking);
			setModalShow(true);
			setUser(booking);
			console.log(booking.id);
		}
	};

	const fetchHandle = async booking => {
		if (booking) {
			try {
				const res = await usersBookingsId(booking.id);

				if (res.status === 200) {
					// Update the state with the fetched data
					await setUserParsed(prevData => ({
						...prevData,
						...res.data,
						has_been_read: true,
					}));
					updateUser();
				} else {
					console.log('Error fetching user data');
				}
			} catch (error) {
				console.error('Error in fetchHandle:', error);
			}
		}
	};

	const updateUser = async () => {
		if (userParsed.id) {
			try {
				await usersBookingsPut(userParsed.id, userParsed, csrf).then(
					response => {
						console.log('has_been_read updated successfully:', response.data);
						getBookingFc();
						setShow(false);
					}
				);
			} catch (error) {
				console.error('Error updating user data:', error);
			}
		}
	};

	const allBarbers = async () => {
		try {
			const res = await allBarber();
			if (res.status === 200) {
				setBarbers(res.data.results);
				// setLoading(true);
			} else {
				console.log('error barber data');
			}
		} catch (error) {
			throw error;
		}
	};

	const allBookings = async () => {
		try {
			const res = await usersBookings();
			if (res.status === 200) {
				setAllBooking(res.data.results);
				// setLoading(true);
			} else {
				console.log('error barber data');
			}
		} catch (error) {
			throw error;
		}
	};

	useEffect(() => {
		allBookings();
		updateUser();
		allBarbers();
	}, [userParsed]);

	let counter = [];
	for (const booked in eventsWithDateTime) {
		if (eventsWithDateTime[booked].has_been_read === false) {
			counter.push({
				id: eventsWithDateTime[booked],
			});
		} //Todo
	}

	return (
		<>
			{eventsWithDateTime && modalShow ? (
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

			<Button variant='warning' className='p-2' onClick={handleShow}>
				ახალი ჯავშანი{' '}
				<span className='badge text-bg-primary'>
					{counter.length ? counter.length : ''}
				</span>
			</Button>

			{eventsWithDateTime ? (
				<Offcanvas show={show} placement={'end'} onHide={handleClose}>
					<Offcanvas.Header closeButton>
						<div className='container'>
							{' '}
							<div className='row g-3'>
								<div className='col-12'>
									<h5>ნოთიფიკაციები</h5>
								</div>
							</div>{' '}
						</div>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Notification
							eventsWithDateTime={eventsWithDateTime}
							handleOpen={handleOpen}
						/>
					</Offcanvas.Body>
				</Offcanvas>
			) : (
				'Loading'
			)}
		</>
	);
}

export default Canvase;

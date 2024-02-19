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
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
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
	console.log('🚀 ~ Canvase ~ eventsWithDateTime:', eventsWithDateTime);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [modalShow, setModalShow] = useState(false);
	const [user, setUser] = useState({ id: null /* other properties */ });
	const [userParsed, setUserParsed] = useState('');
	const [barber, setBarbers] = useState([]);
	const [allBooking, setAllBooking] = useState([]);
	const [barberImage, setBarberImage] = useState('');
	console.log('🚀 ~ Canvase ~ barberImage:', barberImage);
	console.log('🚀 ~ Canvase ~ allBooking:', allBooking);
	console.log('🚀 ~ Canvase ~ barber:', barber);

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
						console.log('User data updated successfully:', response.data);
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
	let updatedAllBooking = { ...eventsWithDateTime };
	if (allBooking) {
		for (const b in allBooking) {
			for (const n in barber) {
				if (allBooking[b].barbery === barber[n].id) {
					// Update the temporary object
					updatedAllBooking = {
						...updatedAllBooking,
						[b]: {
							...updatedAllBooking[b],
							barberImage: barber[n].image,
						},
					};
				}
			}
		}
		console.log(updatedAllBooking);
	}

	useEffect(() => {}, []);
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
								</div>{' '}
								{/* <div className='col-md-6 canvase-piker'>
								{' '}
								<DatePicker
									selected={new Date()}
									// eslint-disable-next-line no-undef
									// onChange={handleDateChange}
									dateFormat='MMMM d, yyyy'
									withPortal
									customInput={<ExampleCustomInput />}
									required
								/>
							</div>{' '}
							<div className='col-md-6 canvase-dropdown'>
								{' '}
								<DropdownButton
									variant='success'
									id='dropdown-basic-button'
									title='ნინო'
								>
									<Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
									<Dropdown.Item href='#/action-2'>
										Another action
									</Dropdown.Item>
									<Dropdown.Item href='#/action-3'>
										Something else
									</Dropdown.Item>
								</DropdownButton>
							</div>{' '} */}
							</div>{' '}
						</div>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<div className='row g-3 align-items-center'>
							{eventsWithDateTime?.map(booking => {
								if (
									booking.has_been_read === false ||
									(booking.has_been_read === true &&
										booking.confirmed === false)
								) {
									return (
										<div
											key={booking.id}
											className={`notification  d-flex  p-2 ${
												booking.has_been_read === false
													? 'border border-warning'
													: ''
											} `}
											onClick={() => handleOpen(booking)}
										>
											<div className='avatar d-flex align-content-center h-100'>
												{' '}
											</div>

											<div className='col-md-5 notification-underline'>
												<p className='fs-6 d-flex'>
													<Image
														height={50}
														width={50}
														src='https://classpass-res.cloudinary.com/image/upload/f_auto/q_auto/wtoctglzxahglqv15iik.jpg'
														roundedCircle
													/>
													<ul>
														<li>Barber: {booking.barbery}</li>
														<li>Clinet: {booking.customer_name}</li>
													</ul>
													{/* <span class='position-absolute   translate-middle p-1 bg-danger border border-danger rounded-circle'>
														<span class='visually-hidden'>New alerts</span>
													</span> */}
												</p>
												{/* <p className='p-2'>
													<span></span>
													{booking.customer_name}
												</p> */}
											</div>
											<div className='col-md-6 text-right notification-underline'>
												<ul>
													<li>
														საათი:{' '}
														{booking &&
														booking.time &&
														typeof booking.time === 'string'
															? booking.time.slice(0, 5)
															: ''}
													</li>
													<li> {booking.customer_phone}</li>
												</ul>
											</div>
											{/* <p>
												{booking.date}{' '}
												<span>
													{' '}
													{booking &&
													booking.time &&
													typeof booking.time === 'string'
														? booking.time.slice(0, 5)
														: ''}
												</span>
											</p>
											<p>{booking.customer_phone}</p> */}
										</div>
									);
								}
								return null;
							})}
						</div>
					</Offcanvas.Body>
				</Offcanvas>
			) : (
				'Loading'
			)}
		</>
	);
}

export default Canvase;

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { usersBookingsId, usersBookingsPut } from '../../api/api';
import ModalCalendar from './modalCalendar.jsx';

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

function Canvase({ eventsWithDateTime, getBookingFc }) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [modalShow, setModalShow] = useState(false);
	const [user, setUser] = useState();
	const [userData, setUserData] = useState({
		service: '',
		time: '',
		customer_name: '',
		customer_phone: '',
		message: '',
		date: new Date(),
		barbery: '',
	});
	const [userParsed, setUserParsed] = useState('');

	const handleOpen = async booking => {
		console.log(booking);

		setModalShow(true);

		setUserData({
			...booking,
			has_been_read: true,
		});

		setUser(booking);

		try {
			const res = await usersBookingsId(booking.id);
			if (res.status === 200) {
				setUserParsed({ ...res.data, has_been_read: true });
				// setLoading(true);
			} else {
				console.log('error barber data');
			}
			await usersBookingsPut(booking.id, userParsed).then(response => {
				console.log('User data updated successfully:', response.data);
				getBookingFc();
				setShow(false);
			});
		} catch (error) {
			throw error;
		}
	};

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
			{modalShow ? (
				<div className='col-12'>
					<ModalCalendar
						user={user}
						show={modalShow}
						onHide={() => setModalShow(false)}
						getBookingFc={getBookingFc}
					/>
				</div>
			) : (
				''
			)}
			<Button variant='warning' className='p-2' onClick={handleShow}>
				ახალი ჯავშანი{' '}
				<span className='badge text-bg-primary'>{counter.length}</span>
			</Button>

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
						{eventsWithDateTime.map(booking => {
							if (
								booking.has_been_read === false ||
								booking.confirmed === false
							) {
								return (
									<div
										key={booking.id}
										className={`notification d-flex p-2 ${
											booking.has_been_read === false
												? 'border border-warning'
												: ''
										} `}
										onClick={() => handleOpen(booking)}
									>
										<div className='col-md-6'>
											<h5>{booking.barbery}</h5>
											<p>{booking.customer_name}</p>
										</div>
										<div className='col-md-6'>
											<p>{booking.date}</p>
											<p>{booking.customer_phone}</p>
										</div>
									</div>
								);
							}
							return null;
						})}
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default Canvase;

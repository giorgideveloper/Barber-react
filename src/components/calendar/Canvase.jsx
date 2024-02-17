import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { usersBookingsPut } from '../../api/api';

function Canvase({ eventsWithDateTime, user, getBookingFc }) {
	console.log('🚀 ~ Canvase ~ eventsWithDateTime:', eventsWithDateTime);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [userData, setUserData] = useState({
		service: '',
		time: '',
		customer_name: '',
		customer_phone: '',
		message: '',
		date: new Date(),
		barbery: '',
	});
	// Confirmed BTN
	const handleConfirm = async id => {
		try {
			setUserData(prevData => ({
				...prevData,
				confirmed: true,
			}));
			await usersBookingsPut(id, userData).then(response => {
				console.log('User data updated successfully:', response.data);
				getBookingFc();
			});
		} catch (error) {
			throw error;
		}
	};

	let counter = [];
	for (const booked in eventsWithDateTime) {
		if (eventsWithDateTime[booked].confirmed === false) {
			counter.push({
				id: eventsWithDateTime[booked],
			});
		}
	}
	return (
		<>
			<Button variant='warning' className='p-2' onClick={handleShow}>
				ახალი ჯავშანი{' '}
				<span className='badge text-bg-primary'>{counter.length}</span>
			</Button>

			<Offcanvas show={show} placement={'end'} onHide={handleClose}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Offcanvas</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					{eventsWithDateTime.map(booking => {
						if (booking.confirmed === false) {
							return (
								<div className='row' key={booking.id}>
									<div className='col-md-6'>
										<h4>
											{eventsWithDateTime.has_been_read ? (
												''
											) : (
												<span className='badge bg-secondary'>New</span>
											)}
											{booking.barbery}
										</h4>
										<p>{booking.date}</p>
									</div>
									<div className='col-md-6'>
										<p>{booking.service}</p>
										<p>{booking.customer_phone}</p>
									</div>
									<div className='col-12 text-center pb-3'>
										<button
											onClick={() => handleConfirm(booking.id)}
											className={`btn ${
												eventsWithDateTime.confirmed
													? 'btn-primary'
													: 'bg-opacity-75 btn-success'
											} `}
										>
											დადასტურება
										</button>
									</div>
								</div>
							);
						}
						return null;
					})}
					;
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}

export default Canvase;

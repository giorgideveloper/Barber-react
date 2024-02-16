import React, { forwardRef, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import {
	allBarber,
	usersBookingsId,
	usersBookingsPut,
	workingHours,
} from '../../api/api';

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

export default function ModalCalendar(props) {
	const [bookingUser, setBookingUser] = useState([]);
	const [hours, setHours] = useState('');
	const [barber, setBarber] = useState('');
	const [userData, setUserData] = useState({
		service: '',
		time: '',
		customer_name: '',
		customer_phone: '',
		message: '',
		date: new Date(),
		barbery: '',
	});

	useEffect(() => {
		const userDatas = async () => {
			try {
				const res = await usersBookingsId(props.user.id);
				if (res.status === 200) {
					setUserData(res.data);
					// setLoading(true);
				} else {
					console.log('error barber data');
				}
			} catch (error) {
				throw error;
			}
		};
		userDatas();
	}, [props.user.id]);
	const allHours = async () => {
		try {
			const res = await workingHours();
			if (res.status === 200) {
				setHours(res.data.results);
				// setLoading(true);
			} else {
				console.log('error barber data');
			}
		} catch (error) {
			throw error;
		}
	};

	const allBarbers = async () => {
		try {
			const res = await allBarber();
			if (res.status === 200) {
				setBarber(res.data.results);
				// setLoading(true);
			} else {
				console.log('error barber data');
			}
		} catch (error) {
			throw error;
		}
	};

	useEffect(() => {
		allHours();
		allBarbers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// for (const n in hours) {
	// 	if (hours[n].id === bookingUser.time) {
	// 		hours[n].time = ''; //Todo
	// 	}
	// }

	const handleInputChange = e => {
		const { name, value } = e.target;
		setUserData(prevData => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleDateChange = date => {
		setUserData(prevData => ({
			...prevData,
			date,
		}));
	};
	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const res = await usersBookingsPut(props.user.id);
			if (res.status === 200) {
				alert('okkk');
				// setLoading(true);
			} else {
				console.log('error barber data');
			}
		} catch (error) {
			throw error;
		}
	};

	return (
		<>
			<Modal
				{...props}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						ჯავშანის ინფორმაცია
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='container'>
						<form className='row g-4 calendar-form  ' onSubmit={handleSubmit}>
							<div className='col-12 col-md-6'>
								<h5>ბარბერი</h5>
								<Form.Select
									aria-label='Default select example'
									name='barbery'
									onChange={handleInputChange}
								>
									<option value={`${bookingUser.barbery}`}>
										{props.user.barbery}
									</option>
									{barber &&
										barber?.map(item => (
											<option key={item.id} value={`${item.id}`}>
												{item.barber_name}
											</option>
											// eslint-disable-next-line react/jsx-no-comment-textnodes
										))}
									//Todo
								</Form.Select>
							</div>
							<div className='col-12 col-md-6'>
								<h5>სერვისი</h5>
								<Form.Control
									name='service'
									type='text'
									value={props.user.service}
									// value={bookingUser.service}
									placeholder={`${props.user.service}`}
									aria-label='Disabled input example'
									disabled
									onChange={handleInputChange}
								/>
							</div>
							<div className='col-12 col-md-6'>
								<h5>ვიზიტის დღე</h5>
								<DatePicker
									selected={new Date(userData.date)}
									// eslint-disable-next-line no-undef
									onChange={handleDateChange}
									minDate={new Date(userData.date)}
									dateFormat='MMMM d, yyyy'
									withPortal
									customInput={<ExampleCustomInput />}
									required
								/>
							</div>
							<div className='col-12 col-md-6'>
								<h5>ვიზიტის დრო</h5>
								<Form.Select
									aria-label='Default select example'
									name='time'
									onChange={handleInputChange}
								>
									<option value={bookingUser.id}>{props.user.time}</option>
									{hours &&
										hours?.map(item => (
											<>
												<option key={item.id} value={item.id}>
													{item.time}
												</option>
											</>
										))}
								</Form.Select>
							</div>
							<div className='col-12 col-md-6'>
								<h5>მომხმარებლის სახეილი</h5>
								<Form.Control
									value={`${props.user.customer_name}`}
									type='text'
									name='customer_name'
									onChange={handleInputChange}
									aria-label='Disabled input example'
									disabled
								/>
							</div>
							<div className='col-12 col-md-6'>
								<h5>მომხმარებლის ნომერი</h5>
								<Form.Control
									type='text'
									value={`${props.user.customer_phone}`}
									name='customer_phone'
									aria-label='Disabled input example'
									disabled
								/>
							</div>
							<div className='col-12'>
								<h5>მომხმარებლის შეტყობინება</h5>

								<Form.Control
									as='textarea'
									value={`${props.user.message}`}
									rows={2}
									name='message'
									onChange={handleInputChange}
									disabled
								/>
							</div>
							<div className='col-12 text-center'>
								<button type='submit' className='btn '>
									ჯავშანის რედაქტირება
								</button>
							</div>
						</form>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

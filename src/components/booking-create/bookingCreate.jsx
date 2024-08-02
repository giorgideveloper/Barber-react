import React, { useEffect, useState } from 'react';
import BookingBarber from './bookingBarber.jsx';
import BookingDate from '../booking/bookingDate.jsx';
import { barberBookingCreate, service } from '../../api/api.js';
import Swal from 'sweetalert2';
import { Toast } from 'react-bootstrap';

function BookingCreate() {
	const [day, setDay] = useState('');
	const [selectedHours, setSelectedHours] = useState([]);
	const [barberId, setBarberId] = useState('');

	const handleSetFreeHour = id => {
		setSelectedHours(prevSelectedHours =>
			prevSelectedHours.includes(id)
				? prevSelectedHours.filter(hourId => hourId !== id)
				: [...prevSelectedHours, id]
		);
	};
	console.log();
	useEffect(() => {
		handleSetFreeHour();
		console.log(handleSetFreeHour());
	}, []);

	let myObg = {
		date: day.split(),
		time: selectedHours,
		customer_name: 'დახურულია',
		customer_phone: '557666363',
		barbery: barberId,
		service: 1,
	};

	const postBooking = async () => {
		try {
			const res = await barberBookingCreate(myObg);
			if (res.status === 201) {
				Swal.fire({
					title: 'საათები დახურულია',
					icon: 'success',
				}).then(result => {
					if (result.isConfirmed) {
						window.location = '/';
					}
				});
			}
		} catch (error) {
			Toast('error', 'სმს კოდი არასწორია');
		}
	};
	return (
		<form className='d-flex'>
			<div className='container'>
				<div className='row g-1'>
					<div className='col-12 col-md-6 mt-3'>
						{' '}
						<BookingBarber setBarberId={setBarberId} />
					</div>

					<div className='col-12 col-md-6 '>
						{' '}
						<BookingDate
							setDay={setDay}
							setFreeHour={handleSetFreeHour}
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
						<button type='button' className='btn' onClick={postBooking}>
							ჯავშანის ჩახურვა
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default BookingCreate;

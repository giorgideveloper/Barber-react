import React, { useEffect, useState } from 'react';
import BookingBarber from './bookingBarber.jsx';
import BookingDate from '../booking/bookingDate.jsx';
import {
	barberBookingCreate,
	csrfBookings,
	workingHours,
} from '../../api/api.js';
import Swal from 'sweetalert2';
import { Toast } from 'react-bootstrap';

function BookingCreate() {
	const [day, setDay] = useState('');
	const [selectedHours, setSelectedHours] = useState([]);
	const [allHouers, setAllHours] = useState([]);
	const [barberId, setBarberId] = useState('');
	const [customName, setCustomName] = useState('ჯავშანი დახურულია');
	const [finalBookings, setFinalBookings] = useState([]);
	const [clickBtn, setClickBtn] = useState(false);
	const [csrf, setCsrf] = useState('');

	const handleSetFreeHour = id => {
		if (id) {
			setSelectedHours(prevSelectedHours =>
				prevSelectedHours.includes(id)
					? prevSelectedHours.filter(hourId => hourId !== id)
					: [...prevSelectedHours, id]
			);
		}
	};

	console.log(selectedHours);
	const handleCustomName = e => {
		if (e.target.value.length > 0) {
			setCustomName(e.target.value);
		} else {
			setCustomName('ჯავშანი დახურულია');
		}
	};

	const allHoursFree = () => {
		let updatedSelectedHours = [...selectedHours];
		for (const freeHour of allHouers) {
			if (updatedSelectedHours.includes(freeHour.id)) {
				updatedSelectedHours = updatedSelectedHours.filter(
					hourId => hourId !== freeHour.id
				);
				setClickBtn(!clickBtn);
			} else {
				updatedSelectedHours.push(freeHour.id);
				setClickBtn(!clickBtn);
			}
		}
		setSelectedHours(updatedSelectedHours);
	};

	const allWorkingHours = async () => {
		try {
			const res = await workingHours();
			setAllHours(res.data.results);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		handleSetFreeHour();
		allWorkingHours();
	}, []);

	let myObg = {
		date: day.split(),
		time: selectedHours,
		customer_name: customName,
		customer_phone: '557666363',
		barbery: barberId,
		service: 1,
	};

	const postBooking = async () => {
		try {
			const res = await barberBookingCreate(myObg, csrf);
			if (res.status === 201) {
				Swal.fire({
					title: `საათები დახურულია`,
					icon: 'success',
				}).then(result => {
					if (result.isConfirmed) {
						window.location = 'https://theclippers.ge/booking/custom_booking/';
					}
				});
			}
		} catch (error) {
			Toast('error', 'სმს კოდი არასწორია');
		}
	};

	const getCsrf = async () => {
		const res = await csrfBookings();
		setCsrf(res);
	};
	getCsrf();
	return (
		<form className='d-flex'>
			<div className='container text-light'>
				<div className='row g-1'>
					<div className='col-12 col-md-6 mt-3'>
						{' '}
						<BookingBarber setBarberId={setBarberId} />
					</div>

					<div className='col-12 col-md-6 '>
						{' '}
						<BookingDate
							barberId={barberId}
							setDay={setDay}
							setFreeHour={handleSetFreeHour}
							type='checkbox'
							setFinalBookings={setFinalBookings}
							clickBtn={clickBtn}
						/>
					</div>
				</div>
				<div className='row g-1 flex-wrap-reverse '>
					<div className='col-12 col-md-6'>
						<h4 className='solid'>სახელი</h4>
						<input
							type='text'
							className='form-control from-inputs bg shadow-sm w-lg-75 w-sm-100'
							id='validationDefault01'
							placeholder={'სახელი'}
							name='customer_name'
							onChange={handleCustomName}
							required
						/>
					</div>
					<div className='col-12 col-md-6 mt-2 '>
						<h4 className='solid'>მონიშნე ყველა დრო</h4>
						<button
							className={`btn  ${clickBtn ? 'bg-black' : ''}`}
							type='button'
							onClick={allHoursFree}
						>
							10:00 - 19:00
						</button>
					</div>
				</div>
				<div className='row justify-content-center text-center'>
					<div className='col-12 mt-5 mb-3 justify-content-center '>
						<button
							type='button'
							className='btn justify-content-center'
							onClick={postBooking}
						>
							ჯავშანის ჩახურვა
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default BookingCreate;

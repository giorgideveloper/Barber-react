import React, { useEffect, useState } from 'react';
import BookingDate from './bookingDate.jsx';
import {
	allBarber,
	bookingCreate,
	bookingSmsCode,
	service,
	serviceRu,
} from '../../api/api.js';

import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyModal from './modal.jsx';
import BorderExample from './spiner.jsx';
import BarberService from './barberService.jsx';
import toast from '../../helper/toast.js';
import SelectBasicExample from './dropdown.jsx';

export default function Booking() {
	const [day, setDay] = useState('');
	const [freeHour, setFreeHour] = useState('');
	const [mobile, setMobile] = useState('');
	const [checkCode, setCheckCode] = useState('');
	const [barber, setBarber] = useState([]);
	const [barberId, setBarberId] = useState('');
	const [barberService, setBarberService] = useState([]);
	//modal
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('შეიიყვაანეთ სმს კოდი');
	//loading
	const [loading, setLoading] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const [phoneNamberValid, SetPhoneNamberValid] = useState(true);
	// const [roomId, setRoomId] = useState(null);
	const language = localStorage.getItem('selectedLanguage');
	const [user, setUser] = useState({
		service: null,
		customer_name: '',
		message: '',
		created_at: new Date(),
	});

	let name, value;

	const data = e => {
		name = e.target.name;
		value = e.target.value;
		setUser({ ...user, [name]: value });
	};

	//finally object
	let myObg = {
		date: day,
		time: freeHour,
		sms_code: checkCode,
		customer_phone: mobile,
		barbery: barberId,
		...user,
	};

	// Get barber
	const barberData = async () => {
		try {
			const res = await allBarber();
			if (res.status === 200) {
				setBarber(res.data.results);
				setLoading(true);
			} else {
				console.log('error barber data');
			}
		} catch (error) {
			throw error;
		}
	};

	// Get service
	const getService = async () => {
		try {
			const selectedLanguage = localStorage.getItem('selectedLanguage');

			if (selectedLanguage === 'ru') {
				const res = await serviceRu();
				if (res.status === 200) {
					setBarberService(res.data.results);
				} else {
					console.log('error service');
				}
			}
			if (selectedLanguage === 'ka') {
				const res = await service();
				if (res.status === 200) {
					setBarberService(res.data.results);
				} else {
					console.log('error service');
				}
			}
			if (selectedLanguage === null) {
				const res = await service();
				if (res.status === 200) {
					setBarberService(res.data.results);
				} else {
					console.log('error service');
				}
			}
		} catch (error) {
			throw error;
		}
	};
	// Post request
	const handleBooking = e => {
		e.preventDefault();
		try {
			sendSms();
		} catch (error) {
			console.log(error);
		}
	};

	//Send sms code
	const sendSms = async () => {
		try {
			if (barberId && day && freeHour && user.service) {
				const res = await bookingSmsCode(mobile);

				if (res.status === 201) {
					setShowModal(true);
					toast('success', 'სმს კოდი გამოგზავნილია');
				} else {
					console.log('error sms code');
				}
			} else {
				toast('info', 'მონიშნეთ ყველა ველიი');
			}
		} catch (err) {
			SetPhoneNamberValid(false);
			console.log('error', 'სმს კოდის გამოგზავნა ვერ მოხერხდა');
		}
	};

	// SMS confirmation and booking reservation
	const finalSmsCode = async () => {
		try {
			const res = await bookingCreate(myObg);
			if (res.status === 201) {
				setShowModal(false);
				Swal.fire({
					title: 'ჯავშანი მიღებულია',
					icon: 'success',
				}).then(result => {
					if (result.isConfirmed) {
						window.location = '/';
					}
				});
			}
		} catch (error) {
			toast('error', 'სმს კოდი არასწორია');
		}
	};

	useEffect(() => {
		// setRoomId(document.getElementsByName('user')[0]?.content);
		barberData();
		getService();
	}, []);

	const languageCodeToPropertyName = {
		ru: 'barber_name_ru',
		ka: 'barber_name',
		en: 'barber_name_eng',
	};
	const propertyName = languageCodeToPropertyName[language] || '';
	// const labelMap = {
	// 	ru: 'Комментарий',
	// 	ka: 'კომენტარი',
	// 	'': 'კომენტარი', // Default value when language is empty
	// };
	return (
		<>
			{loading ? (
				<>
					<div className='container-fluid'>
						<div className='row'>
							<section className='booking-section'>
								<div className='container'>
									<div className='row justify-content-end'>
										<div className='col-md-2 col-3'>
											{' '}
											<SelectBasicExample getService={getService} />
										</div>
									</div>
								</div>
								<div className='row'>
									<div className=' booking-title '>
										<h1>
											{(language === 'ru'
												? 'Забронировать'
												: language === 'ka'
												? 'ჯავშანის გაკეთება'
												: 'ჯავშანის გაკეთება'
											).toString()}
										</h1>
										<div className='booking-solid'></div>
									</div>
								</div>
							</section>
						</div>
					</div>
					<div className='container form-body'>
						<div className='row justify-content-center'>
							<section className='from-modal'>
								<MyModal
									showModal={showModal}
									handleCloseModal={handleCloseModal} //Todo
									modalTitle={modalTitle}
									setCheckCode={setCheckCode}
									finalSmsCode={finalSmsCode}
								/>
							</section>
							<form
								className='row mb-5 g-3 needs-validation booking-form'
								onSubmit={handleBooking}
							>
								<div className='barber-checkbox'>
									<div className='row'>
										<h4 className='solid'>
											{(language === 'ru'
												? 'Выберите услугу'
												: language === 'ka'
												? 'აირჩიეთ სერვისი'
												: 'აირჩიეთ სერვისი'
											).toString()}
										</h4>
										<BarberService barberService={barberService} data={data} />
									</div>
								</div>

								<div className='col-12 col-md-6 mt-3'>
									<div className='row g-2 '>
										<h4 className='solid'>
											{(language === 'ru'
												? 'Выберите барбера'
												: language === 'ka'
												? 'აირჩიეთ ბარბერი'
												: 'აირჩიეთ ბარბერი'
											).toString()}
										</h4>

										<div className='col-md'>
											<div className='row g-2'>
												<div className='col-md-12'>
													<div className=' d-flex barber-radio'>
														{barber &&
															barber?.map(res => (
																// eslint-disable-next-line react/jsx-key
																<label key={res.id}>
																	<input
																		type='radio'
																		name='bookmarked_images'
																		value={res.id}
																		onChange={e => setBarberId(e.target.value)}
																		required
																	/>
																	<img
																		src={`${res.image}`}
																		className='barber-image'
																		alt='Image 1'
																	/>
																	<br />

																	<p className='barber-name'>
																		{res[propertyName]}
																	</p>
																</label>
															))}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='col-12 col-md-6 booking-date '>
									<BookingDate
										setFreeHour={setFreeHour}
										setDay={setDay}
										barberId={barberId}
										setCheckCode={setCheckCode}
									/>
								</div>

								<div className='col-12 col-md-6'>
									<div className='row mt-3  '>
										<h4 className='solid mb-5 '>
											{(language === 'ru'
												? 'Ваша информация'
												: language === 'ka'
												? 'შენი ინფორმაცია'
												: 'შენი ინფორმაცია'
											).toString()}
										</h4>
										<div className='col-md-12'>
											<div className='form-floating '>
												<input
													type='text'
													className='form-control from-inputs shadow-sm'
													id='validationDefault01'
													placeholder={(language === 'ru'
														? 'Имя'
														: language === 'ka'
														? 'სახელი'
														: ''
													).toString()}
													name='customer_name'
													onChange={data}
													required
												/>
												<label htmlFor='validationDefault01'>
													{' '}
													{(language === 'ru'
														? 'Имя'
														: language === 'ka'
														? 'სახელი'
														: 'სახელი'
													).toString()}
												</label>
											</div>
										</div>
										<div className='col-md'>
											<div className='form-floating'>
												<input
													type='tel'
													className={`form-control shadow-sm from-inputs mt-4 		${
														phoneNamberValid ? '' : 'is-invalid'
													}`}
													id='validationCustom01'
													placeholder={(language === 'ru'
														? 'Телефон'
														: language === 'ka'
														? 'ტელეფონი'
														: 'ტელეფონი'
													).toString()}
													name='customer_phone'
													onChange={e => setMobile(e.target.value)}
													required
												/>
												<label htmlFor='validationCustom01'>
													{(language === 'ru'
														? 'Телефон'
														: language === 'ka'
														? 'ტელეფონი'
														: 'ტელეფონი'
													).toString()}
												</label>
												<div className='valid-feedback'>Looks good!</div>
												<div
													id='validationServerUsernameFeedback'
													className='invalid-feedback'
												>
													ტელეფონის ნომერი არასწორია
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-6  text-area'>
									<div className='form-floating'>
										<textarea
											className='form-control shadow-sm from-inputs'
											placeholder='Leave a comment here'
											id='floatingTextarea2'
											style={{ height: 97 }}
											name='message'
											onChange={data}
										></textarea>
										<label htmlFor='floatingTextarea2' className=''>
											{(language === 'ru'
												? 'Комментарий'
												: language === 'ka'
												? 'კომენტარი'
												: 'კომენტარი'
											).toString()}
										</label>
									</div>
								</div>
								<div className='row justify-content-center text-center'>
									<div className='col-md-12 col-12 mt-4'>
										<button type='submit' className='btn '>
											{(language === 'ru'
												? 'Бронировать'
												: language === 'ka'
												? 'ჯავშანის გაკეთება'
												: 'ჯავშანის გაკეთება'
											).toString()}
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</>
			) : (
				<div className='container'>
					<div className='row justify-content-center align-items-center h-100'>
						<section className='spinner'>
							<BorderExample />
						</section>
					</div>
				</div>
			)}
		</>
	);
}

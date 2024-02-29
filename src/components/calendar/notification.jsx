import React from 'react';
import BorderExample from '../booking/spiner.jsx';
import { CiUser } from 'react-icons/ci';
import { PiPhoneThin } from 'react-icons/pi';
import { GoClock } from 'react-icons/go';
import { IoCalendarOutline } from 'react-icons/io5';

export default function Notification({ eventsWithDateTime, handleOpen, show }) {
	return (
		<>
			{' '}
			<div className='row g-3 align-items-center'>
				{/* <div className='col-md-3'>
					<span>სტატუსი</span>
				</div>
				<div className='col-md-6 text-center'>
					<span className=''>ინფორმაცია</span>
				</div> */}
				{show ? (
					eventsWithDateTime?.map(booking => {
						if (
							booking.has_been_read === false ||
							(booking.has_been_read === true && booking.confirmed === false)
						) {
							return (
								<div
									key={booking.id}
									className={`notification shadow bg-secondary bg-opacity-25  d-flex  p-2 ${
										booking.has_been_read === false
											? 'border border-warning'
											: ''
									} `}
									onClick={() => handleOpen(booking)}
								>
									<div className='col-md-6 notification-underline'>
										<ul className='fs-6 d-flex '>
											{/* <Image
														height={50}
														width={50}
														src='https://classpass-res.cloudinary.com/image/upload/f_auto/q_auto/wtoctglzxahglqv15iik.jpg'
														roundedCircle
													/> */}
											<ul>
												<li>
													<IoCalendarOutline /> {booking.date}
												</li>
												<li>
													<CiUser /> {booking.customer_name}
												</li>
											</ul>
										</ul>
									</div>
									<div className=' col-md-6 text-right notification-underline'>
										<ul>
											<li>
												<GoClock />{' '}
												{booking &&
												booking.time &&
												typeof booking.time === 'string'
													? booking.time.slice(0, 5)
													: ''}
											</li>
											<li>
												{' '}
												<PiPhoneThin /> {booking.customer_phone}
											</li>
										</ul>
									</div>
								</div>
							);
						}
						return null;
					})
				) : (
					<BorderExample />
				)}
			</div>
		</>
	);
}

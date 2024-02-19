import React from 'react';
import BorderExample from '../booking/spiner.jsx';

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

									<div className='col-md-7 notification-underline'>
										<ul className='fs-6 d-flex '>
											<span className='bg-danger border  border-danger rounded-circle p-2 h-50 mt-3'></span>
											{/* <Image
														height={50}
														width={50}
														src='https://classpass-res.cloudinary.com/image/upload/f_auto/q_auto/wtoctglzxahglqv15iik.jpg'
														roundedCircle
													/> */}
											<ul>
												<li>Barber: {booking.barbery}</li>
												<li>Clinet: {booking.customer_name}</li>
											</ul>
										</ul>
									</div>
									<div className=' col-md-5 text-right notification-underline'>
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

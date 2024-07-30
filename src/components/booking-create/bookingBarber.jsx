import React, { useEffect, useState } from 'react';
import { allBarber } from '../../api/api';

export default function BookingBarber() {
	const [barber, setBarber] = useState([]);
	const [barberId, setBarberId] = useState('');
	// Get barber
	const barberData = async () => {
		try {
			const res = await allBarber();
			if (res.status === 200) {
				setBarber(res.data.results);
			} else {
				console.log('error barber data');
			}
		} catch (error) {
			throw error;
		}
	};

	useEffect(() => {
		barberData();
	}, []);
	return (
		<div>
			<div className='row g-2 '>
				<h4 className='solid'>აირჩიე ბარბერი </h4>

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

											<p className='barber-name'>{res.name}</p>
										</label>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

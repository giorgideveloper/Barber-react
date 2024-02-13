import React from 'react';
export default function BarberService({ barberService, data }) {
	return (
		<>
			<div className='col-md-4'>
				<div className='barber-service'>
					<h5>თმა</h5>
					{barberService.map(res => {
						if (res.category_type === '1') {
							return (
								<div className='form-group' key={res.id} id='contact_form'>
									<input
										type='checkbox'
										name='service'
										id={`s_c${res.id}`}
										value={res.id}
										onChange={data}
									/>
									<label htmlFor={`s_c${res.id}`}>{res.service_name}</label>
								</div>
							);
						}
						return null;
					})}
				</div>
			</div>
			<div className='col-md-4'>
				<div className='barber-service'>
					<h5>წვერი</h5>
					{barberService.map(res => {
						if (res.category_type === '2') {
							return (
								<div className='form-group' key={res.id} id='contact_form'>
									<input
										type='checkbox'
										name='service'
										id={`s_c${res.id}`}
										value={res.id}
										onChange={data}
									/>
									<label htmlFor={`s_c${res.id}`}>{res.service_name}</label>
								</div>
							);
						}
						return null;
					})}
				</div>
			</div>
			<div className='col-md-4'>
				<div className='barber-service'>
					<h5>ზოგადი</h5>
					{barberService.map(res => {
						if (res.category_type === '3') {
							return (
								<div className='form-group' key={res.id} id='contact_form'>
									<input
										type='checkbox'
										name='service'
										id={`s_c${res.id}`}
										value={res.id}
										onChange={data}
									/>
									<label htmlFor={`s_c${res.id}`}>{res.service_name}</label>
								</div>
							);
						}
						return null;
					})}
				</div>
			</div>
		</>
	);
}

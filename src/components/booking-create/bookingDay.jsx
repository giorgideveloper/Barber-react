import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export default function BookingDay() {
	const [startDate, setStartDate] = useState(new Date());
	// eslint-disable-next-line react/display-name
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
	return (
		<div className='col-12 col-md-6 '>
			<h4 className='solid'>აირჩიე ბარბერი </h4>

			<DatePicker
				selected={startDate}
				onChange={date => setStartDate(date)}
				minDate={new Date()}
				dateFormat='MMMM d, yyyy'
				withPortal
				customInput={<ExampleCustomInput />}
				required
			/>
		</div>
	);
}

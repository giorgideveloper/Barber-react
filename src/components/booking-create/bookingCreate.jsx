import React, { useState } from 'react';

import BookingDate from '../booking/bookingDate.jsx';

function BookingCreate() {
	const [freeHour, setFreeHour] = useState('');
	const [day, setDay] = useState('');
	const [barberId, setBarberId] = useState('');
	const [checkCode, setCheckCode] = useState('');
	return (
		<div>
			<BookingDate
				setFreeHour={setFreeHour}
				setDay={setDay}
				barberId={barberId}
				setCheckCode={setCheckCode}
			/>
		</div>
	);
}

export default BookingCreate;

import axios from 'axios';

const baseUrl = 'https://barbery.lumos.com.ge/booking';

export const usersBookings = async () => {
	try {
		const res = await axios.get(`${baseUrl}/bookings`);
		return res;
	} catch (err) {
		throw err;
	}
};
export const allBarber = async () => {
	try {
		const res = await axios.get(`${baseUrl}/barbery/`);
		return res;
	} catch (err) {
		throw err;
	}
};

export const barberIds = async id => {
	try {
		const res = await axios.get(`${baseUrl}/barbery/${id}`);
		return res.data;
	} catch (err) {
		throw err;
	}
};

export const service = async () => {
	try {
		const res = await axios.get(`${baseUrl}/services/`);
		return res;
	} catch (err) {
		throw err;
	}
};
export const bookingTime = async (time, barberId) => {
	try {
		const res = await axios.get(
			`${baseUrl}/booking-times/?date=${time}&barbery=${barberId}`,
			{
				barbery: barberId,
			}
		);
		return res;
	} catch (err) {
		throw err;
	}
};

export const workingHours = async () => {
	try {
		const res = await axios.get(`${baseUrl}/time`);
		return res;
	} catch (err) {
		throw err;
	}
};
export const bookingSmsCode = async mobile => {
	try {
		const res = await axios.post(
			`${baseUrl}/bookings/sms_code/`,
			{
				mobile_number: mobile,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return res;
	} catch (err) {
		throw err;
	}
};

export const bookingCreate = async data => {
	try {
		const res = await axios.post(
			`${baseUrl}/bookings/create/`,
			{
				...data,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return res;
	} catch (err) {
		throw err;
	}
};

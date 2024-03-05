import React from 'react';
import { Button, Modal } from 'react-bootstrap';
const language = localStorage.getItem('selectedLanguage');
const MyModal = ({
	showModal,
	handleCloseModal,
	modalTitle,
	setCheckCode,
	finalSmsCode,
}) => {
	const generateModalContent = () => (
		<input
			type='text'
			className=' modal-input'
			placeholder='Sms Code'
			aria-describedby='button-addon2'
			onChange={e => setCheckCode(e.target.value)}
		/>
	);
	return (
		<Modal
			show={showModal}
			onHide={handleCloseModal}
			backdrop='static'
			keyboard={false}
			centered
		>
			<Modal.Header>
				<Modal.Title>
					{(language === 'ru'
						? 'Введите СМС-код'
						: language === 'ka'
						? 'შეიყვანეთ სმს კოდი'
						: ''
					).toString()}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{generateModalContent()}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className='btn-modal'
					style={{ backgroundColor: 'red !important' }}
					onClick={finalSmsCode}
				>
					{(language === 'ru'
						? 'Отправлять'
						: language === 'ka'
						? 'გაგზავნა'
						: ''
					).toString()}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default MyModal;

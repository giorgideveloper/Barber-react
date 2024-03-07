import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { smsTitleLang, submitSmsLang } from '../../lang/lang';
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
				<Modal.Title>{smsTitleLang[language]}</Modal.Title>
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
					{submitSmsLang[language]}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default MyModal;

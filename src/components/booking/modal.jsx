import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { smsTitleLang, submitSmsLang } from '../../lang/lang';

const MyModal = ({
	showModal,
	handleCloseModal,
	setCheckCode,
	finalSmsCode,
}) => {
	const [language, setLanguage] = useState(
		localStorage.getItem('selectedLanguage')
	);

	useEffect(() => {
		// Update language when it changes in localStorage
		setLanguage(localStorage.getItem('selectedLanguage'));
	}, []);
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
		<>
			{language && (
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
			)}
		</>
	);
};

export default MyModal;

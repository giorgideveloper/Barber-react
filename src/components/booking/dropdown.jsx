import React from 'react';
import Form from 'react-bootstrap/Form';
import Flag from 'react-world-flags';

// Custom option component with a flag image
const CustomOption = ({ value, label, flagCode }) => (
	<option value={value}>
		<Flag code={flagCode} />
		{label}
	</option>
);

function SelectBasicExample({ getService }) {
	const [selectedLanguage, setSelectedLanguage] = React.useState(
		localStorage.getItem('selectedLanguage') || 'ka'
	);

	const handleSelectChange = event => {
		localStorage.setItem('selectedLanguage', event.target.value);
		setSelectedLanguage(event.target.value);
		getService();
	};

	return (
		<Form.Select
			aria-label='Default select example'
			className='langs mt-2'
			onChange={handleSelectChange}
			value={selectedLanguage}
		>
			<CustomOption value='ka' label='ქარ' flagCode='ge' />
			<CustomOption value='ru' label='RU' flagCode='ru' />
			<CustomOption value='en' label='Eng' flagCode='us' />
		</Form.Select>
	);
}

export default SelectBasicExample;

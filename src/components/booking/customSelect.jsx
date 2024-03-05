import React, { useState } from 'react';

const CustomSelect = ({ options, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = option => {
		onChange(option);
		setIsOpen(false);
	};

	return (
		<div className='custom-select'>
			<div className='selected-option' onClick={handleToggle}>
				{options.find(o => o.value === options.value)?.label}
				{options.find(o => o.value === options.value)?.icon}
			</div>
			{isOpen && (
				<ul className='options'>
					{options.map(option => (
						<li key={option.value} onClick={() => handleSelect(option)}>
							{option.label}
							{option.icon}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CustomSelect;

import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function DisabledTooltip({ booking, index, setFreeHour, type, clickBtn }) {
	console.log(clickBtn);
	return (
		<OverlayTrigger
			overlay={
				booking.booked ? (
					<Tooltip id='tooltip-disabled'>დაკავებულია</Tooltip>
				) : (
					<Tooltip id='tooltip-disabled' className='d-none'></Tooltip>
				)
			}
		>
			<div className={`d-inline `}>
				<input
					type={type}
					className={`btn-check`}
					name='options' // TODO
					id={`${type}-${index}`} // TODO
					autoComplete='off'
					value={booking.id}
					disabled={booking.booked}
					onChange={e => {
						setFreeHour(e.target.value);
					}}
				/>
				<label
					style={clickBtn ? { backgroundColor: '#cf814d !important' } : {}}
					className={`btn btn-primary my-radio ${clickBtn ? 'bg-black' : ''}  `}
					htmlFor={`${type}-${index}`}
				>
					{booking.time.slice(0, 5)}
				</label>
			</div>
		</OverlayTrigger>
	);
}

export default DisabledTooltip;

import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function DisabledTooltip({ booking, index, setFreeHour }) {
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
					type='radio'
					className={`btn-check  `}
					name='options' // TODO
					id={index} // TODO
					autoComplete='off'
					value={booking.id}
					disabled={booking.booked}
					onChange={e => setFreeHour(e.target.value)}
				/>
				<label className={`btn btn-primary my-radio  `} htmlFor={index}>
					{booking.time.slice(0, 5)}
				</label>
			</div>
		</OverlayTrigger>
	);
}

export default DisabledTooltip;

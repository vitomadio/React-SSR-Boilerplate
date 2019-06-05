import React from 'react';
import './ToolTip.css';

const ToolTip = ({ hoverLoc, activePoint, marginTop, currency }) => {

    let placementStyles = {};
    let width = 110;
    placementStyles.width = width + 'px';
    placementStyles.left = hoverLoc - (width / 2) + 10;
    placementStyles.top = marginTop;

    return (
        <div className='hover' style={placementStyles}>
            <div className='date'>{activePoint.d}</div>
            <div className='price'>{parseFloat(activePoint.p).toLocaleString('us-EN', { style: 'currency', currency: currency, minimumFractionDigits: 4, maximumFractionDigits: 4 })}</div>
        </div >
    )
}

export default ToolTip;
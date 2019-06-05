import React from 'react'
import { MdRefresh } from 'react-icons/md';
import './RingLoader.css';

const RingLoader = (props) => {
    return (
        <MdRefresh size={30} color="#0F830C" className="ring-loader" />
    )
}

export default RingLoader;

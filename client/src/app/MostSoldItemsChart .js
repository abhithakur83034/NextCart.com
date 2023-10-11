"use client"

import {ProgressBar} from 'react-bootstrap';

function AnimatedExample() {
    return(
        <>
        <h1>most sold product's</h1>
        <h4>Jeans</h4>
        <ProgressBar animated now={95} label={`${95}%`} />
        <h4>Belt's</h4>
        <ProgressBar animated now={68} label={`${68}%`} />
        <h4>Top</h4>
        <ProgressBar animated now={84} label={`${84}%`} />
        <h4>Other's</h4>
        <ProgressBar animated now={60} label={`${60}%`} />      
        </>
    )
}

export default AnimatedExample;
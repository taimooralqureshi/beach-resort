import React from 'react'
import arrowGif from '../images/gif/loading-arrow.gif'
export default function loading() {
    return (
        <div className='loading'>
            <h4>room data loading...</h4>
            <img src={arrowGif} alt="loading symbol"/>
        </div>
    )
}

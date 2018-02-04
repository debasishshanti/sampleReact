// Image for each product

import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Image = (props) => {

    return (
        <div className='image-container'>
            <img src={props.src} alt={props.alt} title={props.alt} />
        </div>
    );
}

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string
};

export default Image;
import React from 'react';
import ReactDOM from 'react-dom';

import View from './view/view';

import './style.css';

const renderClient = () => {

    const wrapper = document.getElementById('page-wrapper');

    ReactDOM.render(<View/>, wrapper);

};

window.addEventListener('load', renderClient)
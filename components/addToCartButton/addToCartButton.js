// Add to cart button on each

import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const AddButton = (callback) => {

    return (
        <div className='button-holder add-button'>
            <button
                onClick={ 
                    () => { 
                        callback(1)
                    }
                }
            >
                Add to Cart
            </button>
        </div>
    );
}

const InCartButton = (quantity, callback) => {

    return (
        <div className='button-holder in-cart-button'>
            <button
                className='subtract'
                onClick={
                    () => {
                        callback(-1)
                    }
                }
            >
            </button>
            <span>{ `${ quantity } in Cart` }</span>
            <button
                className='add'
                onClick={
                    () => {
                        callback(1)
                    }
                }
            >
            </button>
        </div>
    );
}

const AddtoCartButton = (props) => {

    const { quantityInCart, addRemoveCallback } = props;

    return quantityInCart > 0 ? InCartButton(quantityInCart, addRemoveCallback) : AddButton(addRemoveCallback);
}

AddtoCartButton.propTypes = {
    quantityInCart: PropTypes.number,
    addRemoveCallback: PropTypes.func
};

export default AddtoCartButton;
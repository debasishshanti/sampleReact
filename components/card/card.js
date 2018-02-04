// Card for each product

import React from 'react';
import PropTypes from 'prop-types';

import Image from '../image/image';
import AddToCartButton from '../addToCartButton/addToCartButton';

import './style.css';

class Card extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    addRemoveCallback = (change) => {

        const { id } = this.props;
        this.props.changeQuantity(id, change);
    }

    getContent() {
        const { brand, name, detail, cost } = this.props;

        return (
            <div className='product-content'>
                <div className='brand-container'>
                    <span>{brand}</span>
                </div>
                <div className='name-container'>
                    <h3>{name}</h3>
                </div>
                <div className='detail-container'>
                    <p>{detail}</p>
                </div>
                <div className='brand-container'>
                    <span>{`Rs ${cost}`}</span>
                </div>
            </div>
        );
    }

    render() {

        const { image, name, id, quantity } = this.props;

        return (
            <div className='product-card'>
                <Image
                    src={image}
                    alt={name}
                />
                <div className='content-section'>
                    {this.getContent()}
                    <AddToCartButton
                        quantityInCart={quantity}
                        addRemoveCallback={this.addRemoveCallback}
                    />
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    quantity: PropTypes.number,
    cost: PropTypes.number,
    currency: PropTypes.string,
    detail: PropTypes.string,
    changeQuantity: PropTypes.func
};

export default Card;
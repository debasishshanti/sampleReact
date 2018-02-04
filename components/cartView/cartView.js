//Cart of the page

import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

class CartView extends React.Component {

    constructor(props) {

        super(props)

        this.mappedProductList = this.mapProductList(props.productData);
        this.ids = [];
    }

    mapProductList(productData) {

        let mappedList = {};

        productData.map((product) => {
            mappedList[product.id] = product;
        });

        return mappedList;
    }

    getAddedProducts() {

        const { quantities } = this.props;
        let ids = [];

        for (let i in quantities) {

            if ( quantities[i] > 0 ) {
                ids.push(i);
            }
        }

        return ids;
    }

    calculateTotal() {

        const { quantities } = this.props;
        let totalPrice = 0;

        this.ids.map((id) => {
            totalPrice += this.mappedProductList[id].cost * quantities[id];
        });

        return totalPrice;
    }

    getProductRow(id) {

        const product = this.mappedProductList[id],
            quantity = this.props.quantities[id];

        return (
            <tr key={id}>
                <td>{`${ product.brand } ${ product.name }`}</td>
                <td>{quantity}</td>
                <td>{product.cost * quantity}</td>
                <td>
                    <button
                        className='remove-product'
                        onClick={ () => {
                            this.props.removeProduct(id);
                        }}
                    >
                        Remove
                    </button>
                </td>
            </tr>
        );
    }

    cartView() {

        return (
            <div className='cart-container'>
                <div className='summary-container'>
                    <div className='cart-title'>
                        <h3>Your Cart Summary</h3>
                    </div>
                    <div className='summary-details'>
                        <div className='count-container'>
                            <span>Items in Cart</span>
                            <span>{this.ids.length}</span>
                        </div>
                        <div className='total-container'>
                            <span>Total Rs</span>
                            <span>{this.calculateTotal()}</span>
                        </div>
                    </div>
                    <div className='product-details-container'>
                        <table className='product-details'>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Total Rs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.ids.map((id) => this.getProductRow(id))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    render() {

        this.ids = this.getAddedProducts()
        return ( this.ids.length > 0 ? this.cartView() : null );
    }
}

CartView.propTypes = {
    productData: PropTypes.array,
    quantities: PropTypes.object,
    removeProduct: PropTypes.func
};

export default CartView;
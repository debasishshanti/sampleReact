//product page view

import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card/card';
import CartView from '../cartView/cartView';

import './style.css';

class View extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            inCart: {},
            dataAvailable: false
        };
        this.productData = [];
    }

    writeToLocalStorage(cartList) {

        localStorage.setItem('cartList', JSON.stringify(cartList));
    }

    changeQuantity = (id, value = 0) => {

        if (id) {

            let cartList = this.state.inCart;

            cartList[id] = cartList[id] ? cartList[id] + value : value;
            cartList[id] < 0 ? cartList[id] = 0 : null;

            this.setState({
                inCart: cartList
            });
            this.writeToLocalStorage(cartList);
        }
    }

    matchToLocalData(products) {

        const savedCart = JSON.parse(localStorage.getItem('cartList')) || {};
        const ids = Object.keys(savedCart),
            matchedCart = {};

        if (ids.length == 0) {

            return matchedCart;
        }
        
        products.map((product) => {
            if (ids.indexOf(product.id) > -1) {
                matchedCart[product.id] = savedCart[product.id];
            }
        });

        return matchedCart;
    }

    componentDidMount() {

        const options = {
            mode: 'cors',
            cache: 'default',
            method: 'GET',
        };
        const url = '/data/products.json'

        fetch(url, options)
            .then((response)=>{
                response.json()
                    .then((json) => {
                        let previousCart = this.matchToLocalData(json.products);

                        this.productData = json.products;
                        this.setState({
                            dataAvailable: true,
                            inCart: previousCart
                        });
                    })
            });
    }

    removeProduct = (id) => {

        if (id) {

            let cartList = this.state.inCart;
            cartList[id] = 0;

            this.setState({
                inCart: cartList
            });
            this.writeToLocalStorage(cartList);
        }
    }

    showLoader() {

        return(
            <div className='loader'></div>
        );
    }

    showProducts() {

        return (
            <div className='product-dashboard'>
                <div className='product-list'>
                    {this.productData.map((product)=>(
                        <div className='product-card-container' key={product.id}>
                            <Card
                                quantity={ this.state.inCart[product.id] || 0 }
                                changeQuantity={this.changeQuantity}
                                { ...product }
                            />
                        </div>
                    ))}
                </div>
                <CartView
                    productData={this.productData}
                    quantities={this.state.inCart}
                    removeProduct={this.removeProduct}
                />
            </div>
        );
    }

    getTitle() {

        let title = 'Masala & Spices';

        return ( this.productData.length > 0 ? title + ` (${this.productData.length} items)` : title );
    }

    render() {

        const { dataAvailable } = this.state;

        return (
            <div className='product-page'>
                <div className='page-title'>
                    <h2>{ this.getTitle() }</h2>
                </div>
                { dataAvailable ? this.showProducts() : this.showLoader() }
            </div>
        );
    }
}

export default View;
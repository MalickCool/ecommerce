import React, { Component } from 'react';

import { addToCart, incrementCartItem } from '../../actions/cartActions'

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { format } from '../../others/cart'

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            produits: []
         };
    }

    componentDidMount() {
        this.setState({produits: this.props.prod }) 
    }

    addToBasket = e => {

        //const { produits } = this.state;

        const produits = this.props.prod;

        const { products } = this.props.cart;
        let { itemInCart } = this.props.cart;
        let ProductAlreadyInCart = false;

        products.forEach(element => {
            if(element._id === produits._id){
                element.quantite += 1;
                ProductAlreadyInCart = true;
            }
        });
        
        if(!ProductAlreadyInCart){
            products.push(produits);
        }

        itemInCart += 1;

        this.props.addToCart(products);
        this.props.incrementCartItem(itemInCart);
    }

    openProductPage = e => {
        const { produits } = this.state;
        
        console.log(produits._id)
    }

    render() {
        return ( 
            <div className="col-lg-9 order-1 order-lg-2 mt-2">
                <div id="productMain" className="row">
                    <div className="col-md-6">
                        <img src={this.props.prod.image} alt="" className="img-fluid"/>
                    </div>
                    <div className="col-md-6">
                        <div className="box">
                            <h1 className="text-center">{this.props.prod.designation}</h1>
                            <p className="goToDescription">
                                <a href="#details" className="scroll-to">Scroll to product details, material &amp; care and sizing</a>
                            </p>
                            <p className="price">{format(this.props.prod.prix)} FCFA</p>
                            <p className="text-center buttons">
                                <a className="btn btn-primary" onClick={this.addToBasket}>
                                    <i className="fa fa-shopping-cart"></i> Ajouter au Panier
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div id="details" className="box">
                    <p></p>
                    <h4>Product details</h4>
                    <p>White lace top, woven, has a round neck, short sleeves, has knitted lining attached</p>
                    <h4>Material &amp; care</h4>
                    <ul>
                        <li>Polyester</li>
                        <li>Machine wash</li>
                    </ul>
                    <h4>Size &amp; Fit</h4>
                    <ul>
                        <li>Regular fit</li>
                        <li>The model (height 5'8" and chest 33") is wearing a size S</li>
                    </ul>
                    <blockquote>
                        <p>
                            <em>
                                Define style this season with Armani's new range of trendy tops, crafted with intricate details. Create a chic statement look by teaming this lace number with skinny jeans and pumps.
                            </em>
                        </p>
                    </blockquote>
                    <hr />
                    <div className="social">
                        <h4>Show it to your friends</h4>
                        <p>
                            <a href="#" className="external facebook">
                                <i className="fa fa-facebook"></i>
                            </a>
                            <a href="#" className="external gplus">
                                <i className="fa fa-google-plus"></i>
                            </a>
                            <a href="#" className="external twitter">
                                <i className="fa fa-twitter"></i>
                            </a>
                            <a href="#" className="email">
                                <i className="fa fa-envelope"></i>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    cart: state.cart
});
export default connect(
    mapStateToProps,
    { addToCart, incrementCartItem }
)(withRouter(ProductPage));
import React, { Component } from 'react'
import { addToCart, incrementCartItem } from '../../actions/cartActions'

import { withRouter } from "react-router-dom";

import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { format } from '../../others/cart'

class Product extends Component {
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

        const { produits } = this.state;
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
            <div className="col-md-3 mb-5">	

                <Link
                    to={{
                        pathname: '/product',
                        state: {
                            idProduct: this.props.prod._id
                        }
                    }}
                    className="product-link"
                >
                    <div className="front">
                        <img src={this.props.prod.image} alt="" className="img-fluid" />
                    </div>
                    <div className="text">
                        <h3>
                            {this.props.prod.designation}
                        </h3>
                        <p className="price"> 
                            <del></del>{format(this.props.prod.prix)} FCFA
                        </p>
                    </div>
                </Link>
                
                <div className="add-cart text-center">
                    <a className="btn btn-success w-100" onClick={this.addToBasket}>
                        <i className="fa fa-shopping-cart"></i> Ajouter au Panier
                    </a>
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
)(withRouter(Product));

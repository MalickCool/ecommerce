import React, { Component } from 'react';
import { addToCart, incrementCartItem } from '../../actions/cartActions';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { format } from '../../others/cart';

class commandeline extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push("/connexion")
        }
    }

    numberChange = e => {
        const productId = e.target.id;
        let productQte = (e.target.value > 0) ? e.target.value : 0;
        

        const produits = this.props.produit;
        const { products } = this.props.cart;
        let { itemInCart } = this.props.cart;

        let ProductAlreadyInCart = false;
        let difference = 0;

        products.forEach(element => {
            if(element._id === productId){
                difference = parseInt(productQte) - parseInt(element.quantite);
                element.quantite = parseInt(productQte);
                ProductAlreadyInCart = true;
            }
        });
        
        if(!ProductAlreadyInCart){
            products.push(produits);
        }

        itemInCart += difference;

        this.props.addToCart(products);
        this.props.incrementCartItem(itemInCart);
    }


    deleteLine = e => {

        e.preventDefault();

        const productId = e.target.lang;
        const { products } = this.props.cart;
        let { itemInCart } = this.props.cart;

        let difference = 0;
        let i = 0;
        let indexForDelete = [];

        products.forEach(element => {
            if(element._id === productId){
                difference = parseInt(element.quantite);
                indexForDelete.push(i);
            }
            i++;
        });

        indexForDelete.forEach(index => {
            products.splice(index, 1);
        });

        itemInCart -= difference;

        this.props.addToCart(products);
        this.props.incrementCartItem(itemInCart);
    }

    render() {

        const { produit } = this.props

        return (
            <tr>
                <td>
                    <img src={produit.image} alt={produit.designation} />
                </td>
                <td>{produit.designation}</td>
                <td>
                    <input id={produit._id} type="number" min="1" onChange={this.numberChange} defaultValue={format(produit.quantite)} className="form-control text-center" />
                </td>
                <td>{format(produit.prix)} FCFA</td>
                <td>{format(produit.prix * produit.quantite)} FCFA</td>
                <td>
                    <i lang={produit._id} onClick={this.deleteLine} className="fa fa-trash-o"></i>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart,
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { addToCart, incrementCartItem }
)(withRouter(commandeline));

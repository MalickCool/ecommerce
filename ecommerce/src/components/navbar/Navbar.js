import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from "axios";
//import Menu  from './Menu'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            itemInCart: 0
        };
    }

    componentDidMount(){
        axios
            .post("/api/categorie/all")
            .then(
                res => {
                    this.setState( {categories: res.data } );
                    //console.log(res)
                }
            )
            .catch(err => console.log(err));
    }

    componentDidUpdate(prevProps, prevState){
        const { products } = this.props.cart;
    
        let itemInCart = 0;
        products.forEach(element => {
            itemInCart += element.quantite;
        });
        if(prevState.itemInCart !== this.state.itemInCart){
            this.setState( {itemInCart: itemInCart } );
        }
            
    }
    
    render() {

        const { categories } = this.state;
        const { itemInCart } = this.props.cart;
        
        return (
            <nav className="navbar navbar-expand-lg">
				<div className="container">

                    <Link
                        to='/dashboard'
                        className="navbar-brand home"
                    >
                        <img src="logo.png" alt="Malick Shop Logo" className="logoSmall d-none d-md-inline-block" />
                        <img src="img/logo-small.png" alt="Malick Shop Logo" className="d-inline-block d-md-none" />
						<span className="sr-only"></span>
                    </Link>

                    <div className="navbar-buttons">

                        <button type="button" data-toggle="collapse" data-target="#navigation" className="btn btn-outline-secondary navbar-toggler">
                            <span className="sr-only">Toggle navigation</span>
                            <i className="fa fa-align-justify"></i>
                        </button>

                        <a href="basket.html" className="btn btn-outline-secondary navbar-toggler">
                            <i className="fa fa-shopping-cart"></i>
                        </a>
                    </div>
                    <div id="navigation" className="collapse navbar-collapse">

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link
                                    to='/dashboard'
                                    className="nav-link"
                                >
                                    Accueil
                                </Link>
                            </li>

                            {categories.map(categorie =>
                                <li className="nav-item" key={categorie._id}>
                                    <Link
                                        to={{
                                            pathname: '/categorie',
                                            state: {
                                                idCategorie: categorie._id
                                            }
                                          }}
                                        className="nav-link"
                                    >
                                        { categorie.libelle }
                                    </Link>
                                </li>
                            )}
                        </ul>

                        <div className="navbar-buttons d-flex justify-content-end">
                            <div id="search-not-mobile" className="navbar-collapse collapse"></div>

                            <div id="basket-overview" className="navbar-collapse collapse d-none d-lg-block">
                                <Link
                                    to='/commande'
                                    className="btn btn-primary navbar-btn"
                                >
                                    <i className="fa fa-shopping-cart fa-2x"></i> Panier
                                    <span className="cartItemNumber">{ itemInCart }</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
			</nav>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart
});
export default connect(
    mapStateToProps
)(withRouter(Navbar));
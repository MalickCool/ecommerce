import React, { Component } from 'react'

import { Link, withRouter, Redirect  } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { format } from '../../others/cart'
import { resetCart } from '../../actions/cartActions'

import Commandeline from './commandeline'

class Commande extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount(){
        if(this.props.cart.itemInCart === 0){
            this.props.history.push('/dashboard')
        }
    }

    redirectToDashboard = () => {
        return <Redirect to='/dashboard' />
    }

    validateOrder = (e) =>{
        e.preventDefault();
        alert("commande Validée");

        let totalFacture = 0;
        this.props.cart.products.map(prod =>
            totalFacture += (prod.quantite * prod.prix)
        )

        let data = [];
        const newCommande = {
            user: this.props.auth.user.id,
            montant: totalFacture
        };
        axios
            .post("/api/commande/ajouter", newCommande)
            .then(res => {
                data = res.data;
                console.log(data);
            })
            .catch(err =>
                console.log(err)
            );

        this.props.cart.products.map(prod => {
            totalFacture += (prod.quantite * prod.prix);

            let commandeLine = {
                commande_Id: data._id,
                articleId: prod._id,
                prixUnitaire: prod.prix,
                quantite: prod.quantite
            };
            axios
                .post("/api/detailcmd/ajouter", commandeLine);
        })

        this.props.resetCart();

        this.props.history.push('/dashboard')
    }

    render() {
        const { itemInCart, products } = this.props.cart
        let total = 0;
        return (
            <div id="all">
                
                <div id="content">
                    <div className="container">
                        <div className="row">
                            <div id="basket" className="col-lg-12">
                                <div className="box">
                                    <form onSubmit={this.submitForm}>
                                        <h1>Shopping cart</h1>
                                        <p className="text-muted">
                                            Vous avez { itemInCart } produit(s) dans votre panier.
                                        </p>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">Article</th>
                                                        <th>Quantité</th>
                                                        <th>Prix Unitaire</th>
                                                        <th colSpan="2">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.map(prod =>
                                                        <Commandeline produit={prod} key={prod._id}>
                                                            {total += (prod.quantite * prod.prix)}
                                                        </Commandeline>
                                                    )}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th colSpan="4">Total</th>
                                                        <th colSpan="2">{format(total)} FCFA</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        
                                        <div className="box-footer d-flex justify-content-between flex-column flex-lg-row">
                                            <div className="left">
                                                <Link
                                                    to='/dashboard'
                                                    className="btn btn-outline-secondary"
                                                >
                                                    <i className="fa fa-chevron-left"></i> 
                                                    Continuer mes Achats
                                                </Link>
                                            </div>

                                            <div className="right">
                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#validerCommande">
                                                   Valider Commande <i className="fa fa-chevron-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal" id="validerCommande">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Valider la Commande</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body text-center">
                                Le montant de votre Commande est de <b>{format(total)} FCFA</b>. <br/>
                                Cliquez sur le bouton Valider pour terminer votre achat.
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">
                                    <i className="fa fa-window-close"></i> Fermer
                                </button>
                                <button type="button" onClick={this.validateOrder} className="btn btn-success">
                                    <i className="fa fa-save"></i> Valider
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart,
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps, {resetCart}
)(withRouter(Commande));
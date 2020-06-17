import React, { Component } from 'react';
import axios from 'axios'
import CategorieNavbar from '../navbar/CategorieNavbar'
import ProductPage from '../product/ProductPage'

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            produit: []
        };
    }

    componentDidMount() {
        let statee = this.props.state;
        console.log(statee)
        if(this.props.state === "undefined"){
            this.props.history.push('/dashboard')
        }
        const { idProduct } = this.props.location.state;
        this.getProducts(idProduct);
    }

    getProducts = (idProduct) => {
        axios
            .get("/api/produit/get", { params: {id: idProduct}})
            .then(
                res => {
                    this.setState( {produit: res.data } );
                }
            )
            .catch(err => console.log(err));
    }

    render() {
        const { produit } = this.state;

        return (
            <div id="all">
                <div id="content">
                    <div id="hot">
                        <div className="container">
                            <div className="row">
                                <CategorieNavbar categorie={produit.categorie_id}/>
                                <ProductPage prod={produit}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Container;
import React, { Component } from 'react'
import axios from 'axios'
import Product from '../product/Product'


class Categorie extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            produits: []
         };
    }

    componentDidMount() {
        const { idCategorie } = this.props.location.state;
        this.getProducts(idCategorie);
    }

    componentDidUpdate(prevProps){
        
        if(prevProps.location.state.idCategorie !== this.props.location.state.idCategorie){
            const { idCategorie } = this.props.location.state;
            this.getProducts(idCategorie);
        }
    }

    getProducts = (idCategorie) => {
        axios
            .get("/api/produit/getProducts", { params: {id: idCategorie}})
            .then(
                res => {
                    this.setState( {produits: res.data } );
                    //console.log(res)
                }
            )
            .catch(err => console.log(err));
    }

    render() {

        const { produits } = this.state;

        return (
            <div id="all">
                <div id="content">
                    <div id="hot">
                        <div className="container">
                            <div className="row mt-3">
                                {produits.map(produit =>
                                    <Product prod={produit} key={produit._id}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Categorie;
import React, { Component } from 'react'
import Product from '../product/Product'
import axios from 'axios'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            produits: []
         };
    }
    componentDidMount() {
        axios
            .get("/api/produit/all")
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

export default Dashboard;
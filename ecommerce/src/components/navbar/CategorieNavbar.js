import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from "axios";

class CategorieNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount(){
        axios
            .post("/api/categorie/all")
            .then(
                res => {
                    this.setState( {categories: res.data } );
                }
            )
            .catch(err => console.log(err));
    }
    
    render() {

        const { categories } = this.state;
        
        return (

            <div className="col-lg-3 order-2 order-lg-1">
                <div className="card sidebar-menu mb-4">
                    <div className="card-header">
                        <h3 className="h4 card-title">Categories</h3>
                    </div>
                    <div className="card-body">
                        <ul className="nav nav-pills flex-column category-menu">

                            {categories.map(categorie =>

                                
                                <li className={(categorie._id === this.props.categorie) ? "nav-link active" : "nav-link"}  key={categorie._id}>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default CategorieNavbar;
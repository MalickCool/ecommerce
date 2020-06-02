import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <React.Fragment>
                <Link
                    to="/connexion"
                    className="dropdown-item"
                >
                    { this.props.libelle}
                </Link>
            </React.Fragment>
        );
    }
}

export default Menu;
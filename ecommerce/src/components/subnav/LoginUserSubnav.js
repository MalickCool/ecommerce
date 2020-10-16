import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { connect } from "react-redux";

class LoginUserSubnav extends Component {
    render() {
        return (
            <React.Fragment>

                <li className="list-inline-item dropdown">
                   

                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle" id="navbarDropdown">
                    Bonjour, { this.props.auth.user.name.toUpperCase() }
                    </a>
                    
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link
                            to="/categorie"
                            className="dropdown-item"
                        >
                            Mon compte
                        </Link>
                        <Link
                            to="/connexion"
                            className="dropdown-item"
                        >
                            Mes Commandes
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link
                            to="/connexion"
                            className="dropdown-item"
                        >
                            Déconnexion
                        </Link>
                    </div>
                </li>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(mapStateToProps)(LoginUserSubnav);
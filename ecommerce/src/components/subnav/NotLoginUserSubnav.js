import React from 'react'
import {Link} from 'react-router-dom';

export default function NotLoginUserSubnav() {
    return (
        <React.Fragment>
            <li className="list-inline-item">
                <Link
                    to="/connexion"
                    style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                    }}
                >
                    Se connecter
                </Link>
            </li>
            <li className="list-inline-item">
                <Link
                    to="/inscription"
                    style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                    }}
                >
                    Inscription
                </Link>
                </li>
        </React.Fragment>
    )
}

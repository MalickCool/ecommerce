import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
//import classnames from "classnames";

class Inscription extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
         };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
        
        //console.table(this.props.registerUser);
    }

    render() {
        const { errors } = this.state;
        return (
            <div id="all" className="pt-3">
                <div id="content">
                    <div className="container">
                        <div className="row">
                            <div className="offset-md-3 col-md-6">
                                <div className="box">
                                    <h1>Créer un compte</h1>
                                    <p className="lead">Pas encore de compte?</p>
                                    <p>
                                    Créez votre compte client MalickShop en quelques clics ! Vous pouvez vous inscrire soit en utilisant votre adresse e-mail, soit via votre compte Facebook.
                                    </p>
                                    
                                    <hr />
                                    <form onSubmit = {this.onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name">Nom</label>
                                            <input onChange={this.onChange}
                                                value={this.state.name}
                                                error={errors.name}
                                                className="form-control"
                                                id="name"
                                                required="required"
                                                type="text"
                                            />
                                            <span className="alert-red">{errors.name}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input onChange={this.onChange}
                                                value={this.state.email}
                                                error={errors.email}
                                                className="form-control"
                                                id="email"
                                                required="required"
                                                type="email" 
                                            />
                                            <span className="alert-red">{errors.email}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Mot de Passe</label>
                                            <input onChange={this.onChange}
                                                value={this.state.password}
                                                error={errors.password}
                                                className="form-control"
                                                id="password"
                                                required="required"
                                                type="password" 
                                            />
                                            <span className="alert-red">{errors.password}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Confirmer Mot de Passe</label>
                                            <input onChange={this.onChange}
                                                value={this.state.password2}
                                                error={errors.password2}
                                                className="form-control"
                                                id="password2"
                                                required="required"
                                                type="password" 
                                            />
                                            <span className="alert-red">{errors.password2}</span>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">
                                                <i className="fa fa-user-md"></i> Créer votre compte
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Inscription.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Inscription));
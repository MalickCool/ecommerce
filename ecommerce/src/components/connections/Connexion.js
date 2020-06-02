import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
//import classnames from "classnames";

class Connexion extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            errors: {}
         };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.goBack(); // push user to dashboard when they login
        }

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
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData);

        this.props.history.goBack();
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
                                    <h1>Se connecter</h1>
                                    <p className="lead">Vous avez déjà un compte?</p>
                                    <p className="text-muted">
                                        Entrez vos paramètres et connectez vous à votre compte MalickShop
                                    </p>
                                    <hr />
                                    <form noValidate onSubmit = {this.onSubmit}>
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
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input onChange={this.onChange}
                                                value={this.state.password}
                                                error={errors.password}
                                                className="form-control"
                                                id="password"
                                                required="required"
                                                type="password" 
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">
                                                <i className="fa fa-sign-in"></i> Log in
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

Connexion.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(Connexion);
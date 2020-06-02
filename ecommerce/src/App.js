import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './store'

import './App.css';
import Subnav from './components/subnav/Subnav';
import Navbar from './components/navbar/Navbar';
//import Container from './components/product/Container';
//import Product from './components/product/Product';
import Footer from './components/footer/Footer';
import Connexion from './components/connections/Connexion';
import Inscription from './components/connections/Inscription';
import Categorie from './components/categorie/Categorie';
import Dashboard from './components/dashboard/Dashboard';
import Commande from './components/commande/Commande';
//import PrivateRoute from "./components/private-route/PrivateRoute";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { addToCart, incrementCartItem } from "./actions/cartActions";

import { remakeCart } from './others/cart'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./connexion";
  }
}

remakeCart(store, addToCart, incrementCartItem);

function App() {
  return (
      <Provider store={store} >
        <div className="App">
            <Router>
              <Subnav />
              <Navbar />

              <Route exact path="/connexion" component={Connexion} />
              <Route exact path="/inscription" component={Inscription} />
              <Route exact path="/categorie" component={Categorie} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/commande" component={Commande} />

            </Router>
          
            <Footer />
        </div>
      </Provider>
  );
}

export default App;

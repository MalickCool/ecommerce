import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import { connect } from "react-redux";

import LoginUserSubnav from './LoginUserSubnav';
import NotLoginUserSubnav from './NotLoginUserSubnav';

class Subnav extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
          <div id="top">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offer mb-3 mb-lg-0">
                  
                </div>
                <div className="col-lg-6 text-center text-lg-right">
                  <ul className="menu list-inline mb-0">
                    
                    {this.props.auth.isAuthenticated ?(  
                      <LoginUserSubnav />
                    ) : (
                      <NotLoginUserSubnav />
                    )}
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Subnav);
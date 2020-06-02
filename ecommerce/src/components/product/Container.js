import React, { Component } from 'react';
import Product from './Product';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        return (
            <div id="all">
                <div id="content">
                    <div id="hot">
                        <div className="container">
                            <div className="row">
                                <Product />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Container;
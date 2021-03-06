import React, { Component } from 'react';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default Layout;
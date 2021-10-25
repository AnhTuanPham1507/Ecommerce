import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header';
import Routes from '../routes/Routes'
import Footer from './Footer';
import ProductViewModal from './ProductViewModal';

function Layout() {

    return (
        <BrowserRouter>
            <Route path="/" render={props => (
                <div>
                    <Header {...props} />
                    <div className="container">
                        <div className="main">
                            <Routes />
                        </div>
                    </div>
                    <Footer />
                    <ProductViewModal />
                </div>
            )} />
        </BrowserRouter>
    );
}

export default Layout;
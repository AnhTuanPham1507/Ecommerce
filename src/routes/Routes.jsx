import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Product from '../pages/Product'
import Error from '../pages/Error'
import Login from '../pages/Login';
import Register from '../pages/Register';
import UserInfo from '../pages/UserInfo';
import Order from '../pages/Order';
import Search from '../pages/Search';

function Routes() {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/product/:slug' component={Product} />
            <Route path='/catalog/:slug' component={Catalog} />
            <Route path='/cart' component={Cart} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path="/user-info" component={UserInfo} />
            <Route path="/order" component={Order} />
            <Route path="/search" component={Search} />
            <Route component={Error} />
        </Switch>
    );
}

export default Routes;
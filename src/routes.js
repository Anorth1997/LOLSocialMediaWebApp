import React, { Component } from 'react';
import  { Route, Switch } from 'react-router-dom';


// route imports
import MainLandingPage from './Components/MainLandingPage/main_landing_page';
import LoginPage from './Components/LoginPortal/login';
// import Login from './Components/LoginPage/login';

import './scss-modules/base/base.module.scss';
import Layout from './hoc/Layout/layout';

class Routes extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/login" exact component={LoginPage}/>
                        <Route path="/" exact component={MainLandingPage}/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default Routes;

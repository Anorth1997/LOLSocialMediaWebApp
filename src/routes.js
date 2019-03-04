import React, { Component } from 'react';
import  { Route, Switch } from 'react-router-dom';


// route imports
import MainLandingPage from './Components/MainLandingPage/main_landing_page';
import LoginPage from './Components/LoginPortal/login';
import UserProfilePage from './Components/UserProfilePage/user_profile_page';
import UserHomePage from './Components/UserHomePage/user_home_page';
// import Login from './Components/LoginPage/login';

import './scss-modules/base/base.module.scss';
import Layout from './hoc/Layout/layout';

class Routes extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/:username/home" exact component={UserHomePage}/>
                        <Route path="/login" exact component={LoginPage}/>
                        <Route path="/" exact component={MainLandingPage}/>
                        <Route path="/profile/:id" exact component={UserProfilePage}/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default Routes;

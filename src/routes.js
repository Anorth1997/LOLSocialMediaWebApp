import React, { Component } from 'react';
import  { Route, Switch } from 'react-router-dom';


// route imports
import MainLandingPage from './Components/MainLandingPage/main_landing_page';
// import Login from './Components/LoginPage/login';


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={MainLandingPage}/>
            </Switch>
        );
    }
}

export default Routes;

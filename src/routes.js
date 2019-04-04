import React, { Component } from 'react';
import  { Route, Switch } from 'react-router-dom';


// route imports
import MainLandingPage from './Components/MainLandingPage/main_landing_page';
import LoginPage from './Components/LoginPortal/login';
import RegisterPage from './Components/RegisterPortal/register';
import UserProfilePage from './Components/UserProfilePage/user_profile_page';
import TeamProfilePage from './Components/TeamProfilePage/team_profile_page.js';
import Find from './Components/FindOthersPage/findOthers';
import TournamentPage from './Components/TournamentsPage/tournament_page';
// import Login from './Components/LoginPage/login';

import './scss-modules/base/base.module.scss';
import Layout from './hoc/Layout/layout';
import AdminPortal from './Components/AdminPortal/adminPortal';

class Routes extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/login" exact component={LoginPage}/>
                        <Route path="/register" exact component={RegisterPage}/>
                        <Route path="/" exact component={MainLandingPage}/>
                        <Route path="/profile/:id" exact component={UserProfilePage}/>
                        <Route path="/find" exact component={Find}/>
                        <Route path="/tournaments" exact component={TournamentPage}/>
                        <Route path="/adminportal" exact component={AdminPortal}/>
                        <Route path="/team/:id" exact component={TeamProfilePage}/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default Routes;
//sss

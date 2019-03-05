import React, { Component } from 'react';

import { Tabs, Tab, Sonnet } from 'react-bootstrap';

import TournamentUserProfileTab from '../../Components/UserProfilePage/tournamentProfileTab';
import TeamsUserProfileTab from '../../Components/UserProfilePage/teamsProfileTab';

class UserProfileTabContentContainer extends Component {
    render() {

        // console.log(this.props)

        return (
            <div>

                <Tabs defaultActiveKey="games" id="uncontrolled-tab-example">
                    <Tab eventKey="games" title="Games">
                        <div>
                            Games FROM LoL API
                        </div>

                    </Tab>
                    <Tab eventKey="tournament" title="Tournaments">
                        <TournamentUserProfileTab {...this.props}/>
                    </Tab>
                    <Tab eventKey="teams" title="Teams">
                        <TeamsUserProfileTab {...this.props}/>
                    </Tab>
                </Tabs>

            </div>
        );
    }
}

export default UserProfileTabContentContainer;
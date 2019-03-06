import React, { Component } from 'react';

import { Tabs, Tab, Sonnet } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TournamentUserProfileTab from '../../Components/UserProfilePage/tournamentProfileTab';
import TeamsUserProfileTab from '../../Components/UserProfilePage/teamsProfileTab';
import SettingsContainer from './../settings_container';

class UserProfileTabContentContainer extends Component {

    componentWillMount() {
        // this.props.getUserByUsername(this.props.match.params.id);
    }

    renderSettings = () => {
        if (this.props.currUser) {


            if (this.props.currUser.username === this.props.username) {
                return (<Tab eventKey="settings" title="Settings">
                    <SettingsContainer {...this.props}/>
                </Tab>)
            }

        }
    }

    render() {

        console.log(this.props)

       // console.log(this.props.match.params.id);

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
                    {this.renderSettings()}
                    
                </Tabs>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currUser: state.currUser.info
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(UserProfileTabContentContainer);

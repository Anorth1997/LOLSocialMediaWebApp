import React, { Component } from 'react';

import { Tabs, Tab } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//import TournamentUserProfileTab from '../../Components/UserProfilePage/tournamentProfileTab';
import UsersTeamProfileTab from '../../Components/TeamProfilePage/usersProfileTab';
import IncomingUsersTeamProfileTab from '../../Components/TeamProfilePage/incomingUsersProfileTab';
import SettingsContainer from './../settings_container';

class UserProfileTabContentContainer extends Component {

    componentWillMount() {
        // this.props.getUserByUsername(this.props.match.params.id);
    }

    renderSettings = () => {
        if (this.props.currUser) {


            if (this.props.currUser._id === this.props.team.hostId) {
                return (<Tab eventKey="settings" title="Settings">
                    {/* <SettingsContainer {...this.props}/> */}
                    wow you did it
                </Tab>)
            }

        }
    }

    renderIncomingRequests = () => {
        if (this.props.currUser) {


            if (this.props.currUser._id === this.props.team.hostId) {
                return (<Tab eventKey="incomingRequests" title="Incoming Requests">
                    {/* <SettingsContainer {...this.props}/> */}
                    <IncomingUsersTeamProfileTab {...this.props.team}/>
                </Tab>)
            }

        }
    }

    render() {

        console.log(this.props)
        //
       // console.log(this.props.match.params.id);

        return (
            <div>

                <Tabs defaultActiveKey="games" id="uncontrolled-tab-example">
                    <Tab eventKey="aaa" title="aaa">
                        <div>
                            info about the team?
                        </div>

                    </Tab>
                      <Tab eventKey="Members" title="Members">
                        <UsersTeamProfileTab {...this.props.team}/>
                    </Tab>   
                    {this.renderIncomingRequests()}
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

import React, { Component } from 'react';

import { Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { backendRootLink } from '../../secret/config'
import cx from 'classnames';

//import TournamentUserProfileTab from '../../Components/UserProfilePage/tournamentProfileTab';
import UsersTeamProfileTab from '../../Components/TeamProfilePage/usersProfileTab';
import IncomingUsersTeamProfileTab from '../../Components/TeamProfilePage/incomingUsersProfileTab';
import SettingsContainer from './../settings_container';

class UserProfileTabContentContainer extends Component {

    componentWillMount() {
        // this.props.getUserByUsername(this.props.match.params.id);
    }

    leaveTeam = () => {
        axios.put(`${backendRootLink}/modify/user/leaveTeam`, {
            _id: this.props.currUser._id,
            _teamId: this.props.team._id
        })
        .then(res => {
            alert('Successfully left team')
        })
        .catch(err => {
            alert('Error leaving team. The user might be the owner of this team')
        })
    }

    renderSettings = () => {
        if (this.props.currUser) {

            if (this.props.team.players.currPlayers.indexOf(this.props.currUser._id) != -1) {
                return (<Tab eventKey="settings" title="Settings">
                    <br/>
                    <br/>
                    <Link key={'jumpto'} to={`/profile/${this.props.currUser.username}`}>
                        <button type="button" onClick={() => this.leaveTeam()} className={cx("btn btn-dark")}>Leave Team</button>
                    </Link>
                    
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
                    {/* <Tab eventKey="aaa" title="aaa">
                        <div>
                            info about the team?
                        </div>

                    </Tab> */}
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

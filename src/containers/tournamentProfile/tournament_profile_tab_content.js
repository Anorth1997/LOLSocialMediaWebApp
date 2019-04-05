import React, { Component } from 'react';

import { Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { backendRootLink } from '../../secret/config'
import cx from 'classnames';

//import TournamentUserProfileTab from '../../Components/UserProfilePage/tournamentProfileTab';
import UsersTournamentProfileTab from '../../Components/TournamentProfilePage/usersProfileTab';
import IncomingUsersTeamProfileTab from '../../Components/TeamProfilePage/incomingUsersProfileTab';
import SettingsContainer from './../settings_container';

class TournamentProfileTabContentContainer extends Component {

    componentWillMount() {
        // this.props.getUserByUsername(this.props.match.params.id);
    }

    leaveTournament = () => {
        axios.put(`${backendRootLink}/modify/user/leaveTournament`, {
            _id: this.props.currUser._id,
            _tournamentId: this.props.tournament._id
        })
        .then(res => {
            console.log(res.data)
            alert('Successfully left tournament')
        })
        .catch(err => {
            alert('Error leaving tournament.')
        })
    }

    renderSettings = () => {
        if (this.props.currUser) {

            if (this.props.tournament.participants.currParticipants.indexOf(this.props.currUser._id) != -1) {
                return (<Tab eventKey="settings" title="Settings">
                    <br/>
                    <br/>
                    <Link key={'jumpto'} to={`/profile/${this.props.currUser.username}`}>
                        <button type="button" onClick={() => this.leaveTournament()} className={cx("btn btn-dark")}>Leave Tournament</button>
                    </Link>
                    
                </Tab>)
            }

        }
    }

    renderIncomingRequests = () => {
        if (this.props.currUser) {


            // if (this.props.currUser._id === this.props.tournament.hostId) {
            //     return (<Tab eventKey="incomingRequests" title="Incoming Requests">
            //         {/* <IncomingUsersTeamProfileTab {...this.props.team}/> */}
            //     </Tab>)
            // }

        }
    }

    render() {

        console.log(this.props)
        //
       // console.log(this.props.match.params.id);

        return (
            <div>

                <Tabs defaultActiveKey="games" id="uncontrolled-tab-example">
                    <Tab eventKey="aaa" title="Info">
                        <div>
                            info about the tourn?
                        </div>

                    </Tab>
                      <Tab eventKey="Participants" title="Participants">
                         <UsersTournamentProfileTab {...this.props.tournament}/> 
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



export default connect(mapStateToProps, mapDispatchToProps)(TournamentProfileTabContentContainer);

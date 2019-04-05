import React, { Component } from 'react';

import cx from 'classnames';

import styles from '../../scss-modules/profile-page-container/team-tab.module.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import TournamentInfo from '../../hoc/TournamentInfoContainer/tournInfo';
import IncomingUserInfo from '../../hoc/IncomingUserInfoContainer/incomingUserInfo';
import { getAllIncomingUsers } from './../../actions/index';

class IncomingUsersTeamProfileTab extends Component {

    
    componentWillMount() {
        console.log(this.props)
        const userIds = this.props.players.incomingPlayerRequests.map( (item) => {
            return item;
        })

        this.props.getAllIncomingUsers(userIds);
        // this.props.getAllTournaments(tourns_participated_ids, 'participating');
    }
    


    renderUsers = () => {

        let users_to_render = this.props.server_response.incomingUsers;
        if (users_to_render) {
            return (
                <div>
                    {users_to_render.map((item, i) => {
                        return (
                            <div key={i}>
                                <IncomingUserInfo user={item} hostId={this.props.hostId} teamId={this.props._id} />
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    render() {

        return (
            <div className={cx(styles.teamTab)}>
                {this.renderUsers()}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        server_response: {
            incomingUsers: state.users.incUsers
        }
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getAllIncomingUsers}, dispatch);
}
 
 
 
export default connect(mapStateToProps, mapDispatchToProps)(IncomingUsersTeamProfileTab);
 


import React, { Component } from 'react';

import cx from 'classnames';

import styles from '../../scss-modules/profile-page-container/team-tab.module.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import TournamentInfo from '../../hoc/TournamentInfoContainer/tournInfo';
import UserInfo from '../../hoc/userInfoContainer/userInfo';
import { getAllUsers } from './../../actions/index';

class UsersTournamentProfileTab extends Component {


    
    componentWillMount() {
        
        const userIds = this.props.participants.currParticipants.map( (item) => {
            return item;
        })
        console.log(userIds)
        this.props.getAllUsers(userIds);
        // this.props.getAllTournaments(tourns_participated_ids, 'participating');
    }
    


    renderUsers = () => {

        let users_to_render = this.props.server_response.users;
        console.log(users_to_render)
        if (users_to_render) {
            return (
                <div>
                    {users_to_render.map((item, i) => {
                        return (
                            <div key={i}>
                                <UserInfo user={item} />
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
            users: state.users.usersList
        }
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getAllUsers}, dispatch);
}
 
 
 
export default connect(mapStateToProps, mapDispatchToProps)(UsersTournamentProfileTab);
 


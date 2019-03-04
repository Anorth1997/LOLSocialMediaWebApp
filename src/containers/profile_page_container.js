import React, { Component } from 'react';

import styles from '../scss-modules/profile-page-container/profile-page-container.module.scss';

import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
// import 'font-awesome/css/font-awesome.min.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';



class ProfilePageContainer extends Component {

    componentWillMount() {
            
    }

    render() {
    
        return (
            <div className={styles.profilePageContainer}>
                
                {this.props.currUser ? (<div>
                    <div className={styles.iconAndId}>
                        <img className={styles.profileIcon} src={require(`../assets/images/${this.props.currUser.profile_pic}`)} />
                        <p className={styles.userId}>{this.props.currUser.username}</p>
                    </div>    
                    <p>Email: {this.props.currUser.email}</p>
                    <p>League ID: {this.props.currUser.league_name}</p>
                    <p>Server: {this.props.currUser.server}</p>
                </div>)
                : <Redirect to="/login" />}
                
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


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);
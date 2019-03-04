import React, { Component } from 'react';

import styles from '../scss-modules/profile-page-container/profile-page-container.module.scss';

import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
// import 'font-awesome/css/font-awesome.min.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { logOut } from '../actions/index';



class ProfilePageContainer extends Component {

    componentWillMount() {
            
    }

    render() {
    
        return (
            <div>
                
                {this.props.currUser ? (<div className={cx(styles.profilePageContainer)}>
                    <div className={styles.iconAndId}>
                        <img className={styles.profileIcon} src={require(`../assets/images/${this.props.currUser.profile_pic}`)} />
                        <p className={styles.userId}>{this.props.currUser.username}</p>
                    </div>    
                    <div className={styles.profileStats}>
                        <p>Email: {this.props.currUser.email}</p>
                        <p>League ID: {this.props.currUser.league_name}</p>
                        <p>Server: {this.props.currUser.server}</p>
                        <Link to="/settings">
                            <button className={"btn btn-primary"}>Settings</button>
                        </Link>
                        <div><br/></div>
                        <button className={"btn btn-primary"} onClick={this.log_out}>Log Out</button>
                    </div>
                </div>)
                : <Redirect to="/login" />}
                
            </div>
            
            
        );
    }

    log_out = () => {
        this.props.logOut()
    }

}

const mapStateToProps = (state) => {
    return {
        currUser: state.currUser.info
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({logOut}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);
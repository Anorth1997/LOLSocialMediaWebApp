import React, { Component } from 'react';


import { connect } from 'react-redux';
// import { getAllUsers, getUserByUsername, getUserByEmail, getUserById } from '../../actions/index';

import { bindActionCreators } from 'redux';

// import cx from 'classnames';
import { Link } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import styles from '../../scss-modules/profile-icon/profile-icon.module.scss';

// import PopupProfileSettings from '../../Components/Header/ProfileInfo/PopupProfileInfo.js/popup';


class ProfilePictureContainer extends Component {

    state = {
        hovered: false
    }

    componentWillMount() {
        // console.log(this.props)
    }

    render() {

        return (
            <div className={styles.profileIconContainer}
                onMouseOver={(e) => {
                    this.setState({
                        hovered: true
                    })
                }}
                onMouseLeave={(e) => {
                    this.setState({
                        hovered: false
                    })
                }}>
                {this.props.currUser ? (
                    <div className={styles.profileLinkContainer}>
                        {/* <span> */}
                            <Link
                                to={`/profile/${this.props.currUser.username}`}>
                                {/* {console.log(this.props.currUser.profile_pic)} */}
                                <img className={styles.profileIcon} alt="porifle pic" src={require(`../../assets/images/${this.props.currUser.profile_pic}`)} />
                                <span>{this.props.currUser.username}</span>
                            </Link> 
                        {/* </span> */}
                    </div>
                )
                : 
                    <Link to="/login">
                        <button className={"btn btn-primary"}>Login</button>
                    </Link>}
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



export default connect(mapStateToProps, mapDispatchToProps)(ProfilePictureContainer);

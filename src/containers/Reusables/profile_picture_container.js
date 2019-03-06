import React, { Component } from 'react';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { Link } from 'react-router-dom';

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

        // console.log(this.props);
        // const loggedIn = this.state.currUser ? true : false;

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
                    <Link
                        className={styles.profileLinkContainer}
                        to={`/profile/${this.props.currUser.username}`}>
                        <img className={styles.profileIcon} alt="" src={require(`../../assets/images/${this.props.currUser.profile_pic}`)} />
                        <span>{this.props.currUser.username}</span>
                    </Link>  
                )
                : 
                    <Link to="/login">
                        <button className={"btn btn-primary"}>Login</button>
                    </Link>}
                {/* <PopupProfileSettings
                    loggedIn={loggedIn}
                    show={this.state.hovered}/> */}
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

import React, { Component } from 'react';


import { connect } from 'react-redux';
import { getAllUsers, getUserByUsername, getUserByEmail, getUserById } from '../../actions/index';
import { bindActionCreators } from 'redux';


import { Link } from 'react-router-dom';

import styles from '../../scss-modules/profile-icon/profile-icon.module.scss';


class ProfilePictureContainer extends Component {

    componentWillMount() {
            
    }

    render() {

        console.log(this.props);

        return (
            <div className={styles.profileIconContainer}>
                {this.props.currUser ? (
                    <Link to={`/profile/${this.props.currUser.username}`}>
                        {console.log(this.props.currUser.profile_pic)}
                        <img className={styles.profileIcon} src={require(`../../assets/images/${this.props.currUser.profile_pic}`)} />
                       {/* // {this.props.currUser.username} */}
                    </Link>  
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

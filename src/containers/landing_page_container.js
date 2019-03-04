import React, { Component } from 'react';



import { connect } from 'react-redux';
import { getAllUsers, getUserByUsername, getUserByEmail, getUserById } from '../actions/index';
import { bindActionCreators } from 'redux';

import LoginContainer from './login_container';


class MainLandingPageContainer extends Component {

    componentWillMount() {
        this.props.getAllUsers();     
    }

    render() {

        return (
            <div>
                {/* <LoginContainer/> */}
                Main Landing Page
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getAllUsers, getUserByUsername, getUserByEmail, getUserById}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(MainLandingPageContainer);

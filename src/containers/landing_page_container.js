import React, { Component } from 'react';



import { connect } from 'react-redux';
import { getAllUsers, getUserByUsername, getUserByEmail, getUserById } from '../actions/index';
import { bindActionCreators } from 'redux';

import LoginContainer from './login_container';


class MainLandingPageContainer extends Component {

    componentWillMount() {
         
    }

    render() {

        console.log(this.props)

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
        currUser: state.currUser.info
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(MainLandingPageContainer);

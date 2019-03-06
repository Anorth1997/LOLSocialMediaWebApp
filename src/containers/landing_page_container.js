import React, { Component } from 'react';


import { connect } from 'react-redux';
// import {  } from '../actions/index';
import { bindActionCreators } from 'redux';


import UserDashboard from '../Components/MainLandingPage/userDashboard';
import WelcomeSection from '../Components/MainLandingPage/welcomeSection';


class MainLandingPageContainer extends Component {

    componentWillMount() {
         
    }

    renderTemplate = () => {
        if (this.props.currUser) {
            return (
                <div>
                    <UserDashboard {...this.props.currUser}/>
                </div>
            );
        } else {
            return (
                <WelcomeSection />
            );
        }
    }

    render() {

        console.log(this.props)

        return (
            <div>
               {this.renderTemplate()}
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

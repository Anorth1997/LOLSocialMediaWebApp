import React, { Component } from 'react';


import { connect } from 'react-redux';
// import {  } from '../actions/index';
import { bindActionCreators } from 'redux';



import WelcomeSection from '../Components/MainLandingPage/welcomeSection';


class MainLandingPageContainer extends Component {

    componentWillMount() {
         
    }

    renderTemplate = () => {
        if (this.props.currUser) {
            return (
                <div>
                    The user has logged in
                </div>
            );
        } else {
            return (
                <WelcomeSection {...this.props}/>
            );
        }
    }

    render() {

        // console.log(this.props)

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

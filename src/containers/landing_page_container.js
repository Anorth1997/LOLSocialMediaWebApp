import React, { Component } from 'react';


import { connect } from 'react-redux';
// import {  } from '../actions/index';
import { bindActionCreators } from 'redux';




class MainLandingPageContainer extends Component {

    componentWillMount() {
         
    }

    render() {

        console.log(this.props)

        return (
            <div>
                {/* <WelcomeSection {...this.props}/> */}
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

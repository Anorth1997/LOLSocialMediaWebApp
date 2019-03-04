import React, { Component } from 'react';



import { connect } from 'react-redux';
import { getAllUsers, getUserByUsername, getUserByEmail, getUserById } from '../actions/index';
import { bindActionCreators } from 'redux';


class MainLandingPageContainer extends Component {

    componentWillMount() {
        this.props.getAllUsers();        
    }

    render() {

        console.log(this.props);

        return (
            <div style={{
                background: 'white'
            }}>
                Hello world
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

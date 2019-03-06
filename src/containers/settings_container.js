import React, { Component } from 'react';


import styles from '../scss-modules/settings-container/settings-container.module.scss';
import cx from 'classnames';

import { connect } from 'react-redux';
import { logOut } from '../actions/index';
import { bindActionCreators } from 'redux';

import { changePassword, changeEmail } from '../actions/index';
// import 'font-awesome/css/font-awesome.min.css';
import { Redirect } from 'react-router-dom';

class SettingsContainer extends Component {
    state = {
        displayGeneral: true,
        displayPassword: false,
        displayEmail: false,
        displayIFA: false
    }
    renderGeneral() {
        if (this.state.displayGeneral) {
            return (
                <div className={styles.displayPanel}>
                    <ul className={styles.linkAcc}>
                        <li>Linked Account: {this.props.league_name}</li>
                        <li><button>Edit</button></li>
                    </ul>
                    <ul className={styles.linkAcc}>
                        <li>Dark Mode: </li>
                        <li>  
                            <input type="checkbox"></input>
                        </li>
                    </ul>
                    <ul className={styles.linkAcc}>
                        <li>Discord: </li>
                        <li>Something</li>
                    </ul>
                    <ul className={styles.linkAcc}>
                        <li>Allow Tournaments Notification: </li>
                        <li>
                            <input type="checkbox"></input>
                        </li>
                    </ul>
                </div>
            )
        }
    }

    renderPassword() {
        if (this.state.displayPassword){
            return (
                <div className={styles.displayPanel}>
                    <form className={styles.passwordForm} onSubmit={this.changePasswordForm}>
                        Old Password <br></br>
                        <input id="oldPassword" type="password"></input>
                        <br></br>
                        New Password:<br></br>
                        <input id="newPassword" type="password"></input>
                        <br></br>
                        Confirm Password:<br></br>
                        <input id="confirmPassword" type="password"></input>
                        <br></br>
                        <br></br>
                        <input type="submit" value="Reset"></input>
                    </form> 
                </div>
            )
        }
    }

    renderEmail() {
        if (this.state.displayEmail){
            return (
                <div className={styles.displayPanel}>
                    <form className={styles.passwordForm} onSubmit={this.changeEmailForm}>
                        Current Email:<br></br>
                        <p>{this.props.email}</p>
                        New Email:<br></br>
                        <input id="newEmail" type="text"></input>
                        <br></br>
                        <br></br>
                        <input type="submit" value="Change"></input>
                    </form> 
                </div>
            )
        }
    }

    renderIFA(){
        if (this.state.displayIFA){
            return (
                <div className={styles.displayPanel}>IFA</div>
            )
        }
    }


    renderTabs() {
        return(
            <div className={styles.settingTabs}>
                <button onClick={this.DisplayGeneral}>General</button>
                <button onClick={this.DisplayPassword}>Password</button>
                <button onClick={this.DisplayEmail}>Link e-mail</button>
                <button onClick={this.DisplayIFA}>IFA</button>
                <button onClick={() => {
                    this.props.logOut();
                    // this.renderRedirect(true)
                }}>Logout</button>
            </div>
        )
    }

    render() {

        return (
            <div>
                <div className = {cx("container-fluid", styles.container_frame)}>
                    <div className = "row">
                        <div className = {"col-3"}> {this.renderTabs()} </div>
                        <div className = {"col-7"}>
                            {this.renderGeneral()}
                            {this.renderPassword()}
                            {this.renderEmail()}
                            {this.renderIFA()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    DisplayGeneral = (event) => {
        event.preventDefault();
        this.setState({
            displayGeneral: true,
            displayPassword: false,
            displayEmail: false,
            displayIFA: false
        })
    }

    DisplayPassword = (event) => {
        event.preventDefault();
        this.setState({
            displayGeneral: false,
            displayPassword: true,
            displayEmail: false,
            displayIFA: false
        })
    }

    DisplayEmail = (event) => {
        event.preventDefault();
        this.setState({
            displayGeneral: false,
            displayPassword: false,
            displayEmail: true,
            displayIFA: false
        })
    }

    DisplayIFA = (event) => {
        event.preventDefault();
        this.setState({
            displayGeneral: false,
            displayPassword: false,
            displayEmail: false,
            displayIFA: true
        })
    }

    changePasswordForm = (event) => {
        event.preventDefault();

        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Wrong password
        if (oldPassword !== this.props.password) {
            alert('wrong password');
        }

        // New password doesn't match
        else if (newPassword !== confirmPassword) {
            alert('new password and comfirm password are not the same');
        }

        else {
            changePassword(this.props.id, newPassword);
            alert('Successfully changed password');
        }
        

    }  
    
    changeEmailForm = (event) => {
        event.preventDefault();
        const newEmail = document.getElementById('newEmail').value;

        changeEmail(this.props.id, newEmail);
        alert('Successfully changed email');

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



export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);

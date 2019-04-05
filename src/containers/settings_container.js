import React, { Component } from 'react';


import styles from '../scss-modules/settings-container/settings-container.module.scss';
import cx from 'classnames';

import { connect } from 'react-redux';
import { logOut } from '../actions/index';
import { bindActionCreators } from 'redux';

import { changePassword, changeEmail } from '../actions/index';
// import 'font-awesome/css/font-awesome.min.css';
// import { Redirect } from 'react-router-dom';

class SettingsContainer extends Component {
    state = {
        //displayGeneral: true,
        displayPassword: false,
        displayEmail: false
    }
    // renderGeneral() {
    //     if (this.state.displayGeneral) {
    //         return (
    //             <div className={styles.displayPanel}>
    //                 <ul className={styles.linkAcc}>
    //                     <li>Linked Account: {this.props.league_name}</li>
    //                     <li><button>Edit</button></li>
    //                 </ul>
    //                 <ul className={styles.linkAcc}>
    //                     <li>Dark Mode: </li>
    //                     <li>  
    //                         <input type="checkbox"></input>
    //                     </li>
    //                 </ul>
    //                 <ul className={styles.linkAcc}>
    //                     <li>Discord: </li>
    //                     <li>Something</li>
    //                 </ul>
    //                 <ul className={styles.linkAcc}>
    //                     <li>Allow Tournaments Notification: </li>
    //                     <li>
    //                         <input type="checkbox"></input>
    //                     </li>
    //                 </ul>
    //             </div>
    //         )
    //     }
    // }

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
                        <p>{this.props.currUser.email}</p> 
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


    renderTabs() {
        return(
            <div className={styles.settingTabs}>
                {/* <button onClick={this.DisplayGeneral}>General</button> */}
                <button onClick={this.DisplayPassword}>Password</button>
                <button onClick={this.DisplayEmail}>Link e-mail</button>
                <button onClick={() => {
                    this.props.logOut();
                    // this.renderRedirect(true)
                }}>Logout</button>
            </div>
        )
    }

    render() {
        console.log(this.props.currUser)
        return (
            <div>
                <div className = {cx("container-fluid", styles.container_frame)}>
                    <div className = "row">
                        <div className = {"col-3"}> {this.renderTabs()} </div>
                        <div className = {"col-7"}>
                            {/* {this.renderGeneral()} */}
                            {this.renderPassword()}
                            {this.renderEmail()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // DisplayGeneral = (event) => {
    //     event.preventDefault();
    //     this.setState({
    //         displayGeneral: true,
    //         displayPassword: false,
    //         displayEmail: false
    //     })
    // }

    DisplayPassword = (event) => {
        event.preventDefault();
        this.setState({
            // displayGeneral: false,
            displayPassword: true,
            displayEmail: false
        })
    }

    DisplayEmail = (event) => {
        event.preventDefault();
        this.setState({
            // displayGeneral: false,
            displayPassword: false,
            displayEmail: true
        })
    }

    changePasswordForm = (event) => {
        event.preventDefault();

        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // New password doesn't matchs
        if (newPassword !== confirmPassword) {
            alert('new password and comfirm password does not match');
        }

        else {
            changePassword(this.props.currUser._id, oldPassword, newPassword);
            
        }
        

    }  
    
    changeEmailForm = (event) => {
        event.preventDefault();
        const newEmail = document.getElementById('newEmail').value;
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const emailValidate = newEmail.match(emailRegex)
        if (emailValidate === null) {
            alert('Invalid email format');
        }
        else{
            changeEmail(this.props.currUser._id, newEmail);
            alert('Successfully changed email');
            this.props.currUser.email = newEmail;
            this.setState({
                displayGeneral: false,
                displayPassword: false,
                displayEmail: true
            })
        }
        

    } //

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

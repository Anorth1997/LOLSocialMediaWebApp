import React, { Component } from 'react';
import { users, tournaments } from '../dummy_hardcoded_data';


import styles from '../scss-modules/settings-container/settings-container.module.scss';
import brandImage from '../assets/images/lol-brand-img.png';
import profilePicTest from '../assets/images/profile-pic-1.png'

import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
// import 'font-awesome/css/font-awesome.min.css';

import FormFields from '../widgets/Forms/formfields';
import ErrorMessage from '../widgets/Errors/ErrorMessage';
import CheckBox from '../widgets/Checkbox/checkbox';
import HelpSection from '../Components/LoginPortal/helpSection';

const user = users[0];
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
                        <li>Linked Account: </li>
                        <li>{user.league_name}</li>
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
                    <form className={styles.passwordForm}>
                        New Password:<br></br>
                        <input type="text"></input>
                        <br></br>
                        Confirm Password:<br></br>
                        <input type="text"></input>
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
                    <form className={styles.passwordForm}>
                        Current Email:<br></br>
                        <p>{user.email}</p>
                        New Email:<br></br>
                        <input type="text"></input>
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
            </div>
        )
    }

    render() {

        return (
            <div className={styles.bg}>
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

}

export default SettingsContainer;
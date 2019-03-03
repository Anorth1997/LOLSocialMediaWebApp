import React, { Component } from 'react';

import styles from '../scss-modules/login-container/login-container.module.scss';
import brandImage from '../assets/images/lol-brand-img.png';
import profilePicTest from '../assets/images/profile-pic-1.png'

import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
// import 'font-awesome/css/font-awesome.min.css';

import FormFields from '../widgets/Forms/formfields';
import ErrorMessage from '../widgets/Errors/ErrorMessage';
import CheckBox from '../widgets/Checkbox/checkbox';
import HelpSection from '../Components/LoginPortal/helpSection';


class LoginContainer extends Component {

    state = {
        showWarning: false,
    }

    updateForgottenForm = (newState) => {
        this.setState({
            forgotFormData: newState,
            showWarning: false
        })
    }

    submitForgotForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};

        for (let key in this.state.forgotFormData) {
            dataToSubmit[key] = this.state.forgotFormData[key].value;
        }

        // do error checking first
        // if there is an error
        this.setState({
            showWarning: true
        })

        // console.log(dataToSubmit);
    }

    submitLoginForm = (event) => {
        event.preventDefault();


        let dataToSubmit = {};

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
        }

        // do error checking first
        // if there is an error
        this.setState({
            showWarning: true
        })


        // console.log(dataToSubmit);
    }    

    render() {

        return (
            <div className={styles.bg}>
                <div>
                    <img scr={profilePicTest} alt="ProfilePic"/>
                </div>
            </div>
        );
    }

    renderForgotUsername = () => {
        // console.log('forgot username clicked');
        this.setState({
            mainLoginForm: false,
            forgotPage: {
                type: 'Forgot Username',
                message: 'Please enter the email of the account that you forgot the username of',
                show: true
            }
        });
    }

    renderForgotPassword = () => {
        this.setState({
            mainLoginForm: false,
            forgotPage: {
                type: 'Forgot Password',
                message: 'Please enter the email or username of the account that you forgot the password of',
                show: true
            }
        });
    }

    renderForgotEmail = () => {
        this.setState({
            mainLoginForm: false,
            forgotPage: {
                type: 'Forgot Email',
                message: 'Please enter the username of the account that you forgot the email of',
                show: true
            }
        });
    }

}

export default LoginContainer;
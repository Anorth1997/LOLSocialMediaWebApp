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


class ProfilePageContainer extends Component {

 

    render() {

        return (
            <div style={{
                color: 'white'
            }}> 
                This is the profile container
            </div>
        );
    }

}

export default ProfilePageContainer;
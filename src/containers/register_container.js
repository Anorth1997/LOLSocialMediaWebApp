import React, { Component } from 'react';

import styles from '../scss-modules/login-container/login-container.module.scss';
import brandImage from '../assets/images/lol-brand-img.png';

import cx from 'classnames';
// import 'font-awesome/css/font-awesome.min.css';

import { Redirect } from 'react-router-dom';


import FormFields from '../widgets/Forms/formfields';
import ErrorMessage from '../widgets/Errors/ErrorMessage';

import { connect } from 'react-redux';
import { tryLoggingIn } from '../actions/index';
// import { Register } from '../actions/index';
import { bindActionCreators } from 'redux';


class LoginContainer extends Component {

    state = {
        showWarning: false,
        showShortPasswd: false,
        showDiffPasswd: false,
        showShortUsername: false,
        loginStatus: false,
        formData: {
            username: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Username',
                config: {
                    name: 'username_input',
                    type: 'text',
                    placeholder: '',
                    autoComplete: 'off',
                    autoFocus: true
                },
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Password',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: '',
                    autoComplete: 'off'
                },  
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            rePassword: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Reenter Pasword',
                config: {
                    name: 'rePassword_input',
                    type: 'rePassword',
                    placeholder: '',
                    autoComplete: 'off'
                },  
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Email',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: '',
                    autoComplete: 'off'
                },  
                validation: {
                    required: true,
                    minLength: 0
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            leagueUserName: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'League User Name',
                config: {
                    name: 'lolusername_input',
                    type: 'lolusername',
                    placeholder: '',
                    autoComplete: 'off'
                },  
                validation: {
                    required: true,
                    minLength: 0
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    renderTemplate = (render) => {

        return (
            <div>
                <h1 className={styles.signInLabel}>Register</h1>

                <form onSubmit={this.submitRegFrom}
                    className={styles.formStyle}>

                    <ErrorMessage
                        show={this.state.showWarning}
                        message='You must fill in the required boxes with information'
                    />

                    <ErrorMessage
                        show={this.state.showShortUsername}
                        message='Username must be at least 5 characters long'
                    />

                    <ErrorMessage
                        show={this.state.showShortPasswd}
                        message='Password must be at least 6 characters long'
                    />

                    <ErrorMessage
                        show={this.state.showDiffPasswd}
                        message='The reentered password does not match the first one'
                    />

                    

                    <FormFields
                        formData={this.state.formData}
                        onblur={(newState) => {
                            this.updateForm(newState);
                        }}
                        change={(newState) => {
                            this.updateForm(newState);
                        }}
                        styles={styles}
                    />

                    <div className={styles.buttonWrapper}>
                        <button className={cx('btn', styles.btnSignIn)} action="submit">REGISTER</button>
                    </div>

                </form>
            </div>)
        
        ;
    }

    updateForm = (newState) => {
        this.setState({
            formData: newState
            //, showWarning: false
        });
    }

    submitRegFrom = (event) => {
        event.preventDefault();


        let dataToSubmit = {};
        let checkEmptyBox = true;
        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            if (!dataToSubmit[key])
                checkEmptyBox = false
        }

        const checkSamePasswd = dataToSubmit.password === dataToSubmit.rePassword;
        const checkUserNameLen = dataToSubmit.username.length >= 5;
        const checkPasswdLen = dataToSubmit.password.length >= 6;
        

        if (checkSamePasswd && checkUserNameLen && checkPasswdLen && checkEmptyBox) {
            // try to register
            // this.props.register(dataToSubmit);
        } else {
            // do error checking first
            // if there is an error
            this.setState({
                showDiffPasswd: !checkSamePasswd,
                showShortUsername: !checkUserNameLen,
                showShortPasswd: !checkPasswdLen,
                showWarning: !checkEmptyBox
            })
        }
        // console.log(dataToSubmit);
    }    

    componentDidUpdate() {
        // console.log('updated component');
        if (this.props.currUser) { 
            this.setState({
                loginStatus: true
            })
        }
    }
    

    render() {

        //console.log(this.props);

        if (this.state.loginStatus) {
            return (
                <Redirect to="/" />
            );
        }

        return (
            <div className={styles.bg}>
                <div className={"container-fluid"}>
                    <div className="row">
                        <div className="col"></div>
                        <div className={cx("col-xs-12", "col-sm-10", "col-md-6", "col-lg-4", styles.formArea)}>
                            

                            <img src={brandImage} alt="Brand" className={styles.brandImage}/>

                            <div className={styles.boxWrapper}>
                                {this.renderTemplate()}
                                {/* {this.state.mainLoginForm ? this.template : null} */}
                            </div>
                        </div>
                        <div className="col"></div>
                    
                    </div>
                </div>


            </div>
        );
    }

}

const mapStateToProps = (state) => {
   // console.log(state.currUser.info)
    return {
        currUser: state.currUser.info
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({tryLoggingIn}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

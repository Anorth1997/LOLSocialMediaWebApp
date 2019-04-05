import React, { Component } from 'react';

import styles from '../scss-modules/login-container/login-container.module.scss';
import brandImage from '../assets/images/lol-brand-img.png';

import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
// import 'font-awesome/css/font-awesome.min.css';

import { Redirect } from 'react-router-dom';


import FormFields from '../widgets/Forms/formfields';
import ErrorMessage from '../widgets/Errors/ErrorMessage';
import CheckBox from '../widgets/Checkbox/checkbox';
import HelpSection from '../Components/LoginPortal/helpSection';
import { users } from '../dummy_hardcoded_data';

import { connect } from 'react-redux';
import { tryLoggingIn } from '../actions/index';
import { bindActionCreators } from 'redux';

import { riotApiKey, rootRiotApiLink, backendRootLink } from '../secret/config';
import axios from 'axios';


class LoginContainer extends Component {

    state = {
        showWarning: false,
        rememberMe: false,
        mainLoginForm: 'signIn',
        loginStatus: false,
        showDiffPasswd: false,
        showInvalidEmail: false,
        showLeagueUserNotExist: false,
        showSuccessSignUpMessage: false,
        showFailedSignup: false,
        forgotPage: {
            type: '',
            message: '',
            show: false
        },
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
                    minLength: 0
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
                    minLength: 0
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        },
        forgotFormData: {
            forgottenInput: {
                element: 'input',
                value: '',
                label: true,
                labelText: '',
                config: {
                    name: 'username_forgot_input',
                    type: 'text',
                    placeholder: '',
                    autoComplete: 'off',
                    autoFocus: true
                },
                validation: {
                    required: true,
                    minLength: 0
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        },
        signupFormData: {
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

        if (render === 'signIn') {
            return (
                <div>
                    <h1 className={styles.signInLabel}>Sign in</h1>

                    <form onSubmit={this.submitLoginForm}
                        className={styles.formStyle}>

                        <ErrorMessage
                            error={false}
                            show={this.state.showSuccessSignUpMessage}
                            message='You have successfully signed up!'
                        />

                        <ErrorMessage
                            error={true}
                            show={this.state.showWarning}
                            message='You must fill in the required boxes with information'
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

                        <CheckBox
                            checkBoxStyling={styles}
                            text='Remember me'
                            checked={this.state.rememberMe}
                        />

                        <div className={styles.buttonWrapper}>
                            <button className={cx('btn', styles.btnSignIn)} action="submit">SIGN IN</button>
                        </div>

                        <div style={{textAlign: 'center', marginBottom: '40px', fontSize: '16px', color: 'white'}}>
                            If you do not have an account, sign up <span className={styles.createAccountButton} onClick={() => {
                                this.setState({
                                    mainLoginForm: 'signUp'
                                })
                            }} style={{color: 'blue'}}>here</span>
                        </div>

                        <HelpSection
                            helpSectionStyle={styles}
                            forgotUsername={this.renderForgotUsername}
                            forgotPassword={this.renderForgotPassword}
                            forgotEmail={this.renderForgotEmail}
                        />

                    </form>
                </div>
            )
        } else if (render === 'signUp') {

            return (
                <div>

                    <FontAwesome
                        className={styles.backButtonIcon}
                        name='arrow-left'
                        onClick={() => {
                            this.setState({
                                forgotPage: {
                                    type: '',
                                    message: '',
                                    show: false
                                },
                                mainLoginForm: 'signIn',
                            });
                        }}
                    />

                <h1 className={styles.signInLabel}>Register</h1>

                <form onSubmit={this.submitSignupForm}
                    className={styles.formStyle}>

                    <ErrorMessage 
                        error={true}
                        show={this.state.showFailedSignup}
                        message={this.state.failedSignupMessage}
                    />

                    <ErrorMessage
                        error={true}
                        show={this.state.showDiffPasswd}
                        message='The passwords do not match'
                    />

                    <ErrorMessage
                        error={true}
                        show={this.state.showWarning}
                        message='You must fill in the required boxes with information'
                    />

                    <ErrorMessage
                        error={true}
                        show={this.state.showInvalidEmail}
                        message='The email address is invalid'
                    />        
                    
                    <ErrorMessage
                        error={true}
                        show={this.state.showLeagueUserNotExist}
                        message='League of Legends username does not exist.'
                    />

                    <FormFields
                        formData={this.state.signupFormData}
                        onblur={(newState) => {
                            this.updateSignupForm(newState);
                        }}
                        change={(newState) => {
                            this.updateSignupForm(newState);
                        }}
                        styles={styles}
                    />

                    <div className={styles.buttonWrapper}>
                        <button className={cx('btn', styles.btnSignIn)} action="submit">REGISTER</button>
                    </div>

                </form>
            </div>
            )

        } else {
            return (
                <div>

                    <FontAwesome
                        className={styles.backButtonIcon}
                        name='arrow-left'
                        onClick={() => {
                            this.setState({
                                forgotPage: {
                                    type: '',
                                    message: '',
                                    show: false
                                },
                                mainLoginForm: 'signIn',
                            });
                        }}
                    />

                    <h1 className={styles.signInLabel}>{this.state.forgotPage.type}</h1>

                    <ErrorMessage
                        error={true}
                        show={this.state.showWarning}
                        message='You must fill in the required boxes with information'
                    />

                    <p className={styles.forgotInfo}>{this.state.forgotPage.message}</p>

                    <form onSubmit={this.submitForgotForm}
                        className={styles.formStyle}>

                        <FormFields
                            formData={this.state.forgotFormData}
                            onblur={(newState) => {
                                this.updateForgottenForm(newState);
                            }}
                            change={(newState) => {
                                this.updateForgottenForm(newState);
                            }}
                            styles={styles}
                        />

                        <div className={styles.buttonWrapper}>
                            <button className={cx('btn', styles.btnSignIn)} action="submit">SUBMIT</button>
                        </div>

                    </form>

                </div>
            )
        }
    }

    updateSignupForm = (newState) => {
        this.setState({
            signupFormData: newState,
            showWarning: false,
            showDiffPasswd: false,
            showLeagueUserNotExist: false,
            showInvalidEmail: false,
            showFailedSignup: false,
            failedSignupMessage: ''
        })
    }

    updateForgottenForm = (newState) => {
        this.setState({
            forgotFormData: newState,
            showWarning: false
        })
    }

    updateForm = (newState) => {
        this.setState({
            formData: newState,
            showWarning: false,
            showSuccessSignUpMessage: false
        });
    }

    submitSignupForm = (event) => {
        event.preventDefault();


        let dataToSubmit = {};
        let noEmptyBox = true;
        for (let key in this.state.signupFormData) {
            dataToSubmit[key] = this.state.signupFormData[key].value;
            if (!dataToSubmit[key])
            noEmptyBox = false
        }

        console.log(dataToSubmit);

        const samePasswd = dataToSubmit.password === dataToSubmit.rePassword;
        // // password validation
        // const passwdRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
        // // if this is not null, then we can continue
        // const passwdValidate = dataToSubmit.password.match(passwdRegex)
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const emailValidate = dataToSubmit.email.match(emailRegex)

        if (!dataToSubmit.password || !dataToSubmit.username || !dataToSubmit.email || !dataToSubmit.leagueUserName) {
            this.setState({
                showWarning: true
            })
        } else if (!samePasswd) {
            this.setState({
                showDiffPasswd: true
            })
        } 
        else if (emailValidate === null) {
            this.setState({
                showInvalidEmail: true
            })
        } else {
            this.testLeagueUsernameAgainstApi(dataToSubmit.leagueUserName)
                .then(val => {
                    if (!val) this.setState({ showLeagueUserNotExist: true })
                    else {
                        this.registerAccount(dataToSubmit.username, dataToSubmit.password, dataToSubmit.email, dataToSubmit.leagueUserName)
                            .then(val => {
                                console.log('done pinging the server')
                                if (val.data === 'Success') {
                                    this.setState({
                                        mainLoginForm: 'signIn',
                                        showSuccessSignUpMessage: true
                                    })
                                }
                                console.log(val)
                            })
                            .catch(err => {
                                // console.log('error from server')
                                console.log(err.response.data)
                                if (err.response.data.includes('username')) {
                                    this.setState({
                                        showFailedSignup: true,
                                        failedSignupMessage: 'The username is already in use'
                                    })
                                } else if (err.response.data.includes('email')) {
                                    this.setState({
                                        showFailedSignup: true,
                                        failedSignupMessage: 'The email is already in use'
                                    })
                                } else if (err.response.data.includes('leagueUsername')) {
                                    this.setState({
                                        showFailedSignup: true,
                                        failedSignupMessage: 'The league of legends account is already in use'
                                    })
                                }
                            })
                    }
                })
                .catch(err => {
                    this.setState({
                        showLeagueUserNotExist: true
                    })
                })
        }

        // test leagueUsername against api
        

        // console.log(passwdValidate);
    }    

    registerAccount = (username, password, email, leagueUsername) => {

        return axios.post(`${backendRootLink}/register/user`, {
            username,
            password,
            email,
            leagueUsername
        })
    }

    testLeagueUsernameAgainstApi = (leagueUsername) => {

        return axios.get(`${rootRiotApiLink}/lol/summoner/v4/summoners/by-name/${encodeURI(leagueUsername)}?api_key=${riotApiKey}`)
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
        this.props.tryLoggingIn(dataToSubmit.username, dataToSubmit.password);
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
                                {this.renderTemplate(this.state.mainLoginForm)}
                                {/* {this.state.mainLoginForm ? this.template : null} */}
                            </div>
                        </div>
                        <div className="col"></div>
                    
                    </div>
                </div>


            </div>
        );
    }

    renderForgotUsername = () => {
        // console.log('forgot username clicked');
        this.setState({
            mainLoginForm: 'forgotForm',
            forgotPage: {
                type: 'Forgot Username',
                message: 'Please enter the email of the account that you forgot the username of',
                show: true
            }
        });
    }

    renderForgotPassword = () => {
        this.setState({
            mainLoginForm: 'forgotForm',
            forgotPage: {
                type: 'Forgot Password',
                message: 'Please enter the email or username of the account that you forgot the password of',
                show: true
            }
        });
    }

    renderForgotEmail = () => {
        this.setState({
            mainLoginForm: 'forgotForm',
            forgotPage: {
                type: 'Forgot Email',
                message: 'Please enter the username of the account that you forgot the email of',
                show: true
            }
        });
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

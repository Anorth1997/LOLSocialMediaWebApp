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

import { connect } from 'react-redux';
import { tryLoggingIn } from '../actions/index';
import { bindActionCreators } from 'redux';


class LoginContainer extends Component {

    state = {
        showWarning: false,
        rememberMe: false,
        mainLoginForm: true,
        loginStatus: false,
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
                    type: 'text',
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
        }
    }

    renderTemplate = (render) => {

        return render ? 
            <div>
                <h1 className={styles.signInLabel}>Sign in</h1>

                <form onSubmit={this.submitLoginForm}
                    className={styles.formStyle}>

                    <ErrorMessage
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

                    <HelpSection
                        helpSectionStyle={styles}
                        forgotUsername={this.renderForgotUsername}
                        forgotPassword={this.renderForgotPassword}
                        forgotEmail={this.renderForgotEmail}
                    />

                </form>
            </div>
        : 
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
                            mainLoginForm: true,
                        });
                    }}
                />

                <h1 className={styles.signInLabel}>{this.state.forgotPage.type}</h1>

                <ErrorMessage
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
        ;
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
            showWarning: false
        });
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




        console.log(dataToSubmit);

        this.props.tryLoggingIn(dataToSubmit.username, dataToSubmit.password);
        

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

import React, { Component } from 'react';

import styles from '../scss-modules/login-container/login-container.module.scss';
import brandImage from '../assets/images/lol-brand-img.png';

import cx from 'classnames';
import FormFields from '../widgets/Forms/formfields';
import ErrorMessage from '../widgets/Errors/ErrorMessage';

class LoginContainer extends Component {

    state = {
        showWarning: false,
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
        }
    }

    updateForm = (newState) => {
        // console.log(newState);
        this.setState({
            formData: newState,
            showWarning: false
        });
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
    }


    render() {


        return (
            <div className={styles.bg}>
                <div className={"container-fluid"}>
                    <div className="row">
                        <div className="col"></div>
                        <div className={cx("col-xs-12", "col-sm-10", "col-md-6", "col-lg-4", styles.formArea)}>
                            

                            <img src={brandImage} alt="Brand" className={styles.brandImage}/>

                            <div className={styles.boxWrapper}>
                            
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
                                
                                    <div className={styles.buttonWrapper}>
                                        <button className={cx('btn', styles.btnSignIn)} action="submit">SIGN IN</button>
                                    </div>
                                
                                </form>


                            </div>

                            

                        </div>
                        <div className="col"></div>
                    
                    </div>
                </div>


            </div>
        );
    }
}

export default LoginContainer;
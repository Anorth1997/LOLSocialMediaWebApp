import React, { Component } from 'react';

import cx from 'classnames';

import { connect } from 'react-redux';
import { changeUserInfo } from '../../actions/index';
import { bindActionCreators } from 'redux';

import styles from '../../scss-modules/admin-container/users_list.module.scss';

import FormFields from '../../widgets/Forms/formfields';

class AdminUserInformationTab extends Component {

    state = {
        formData: {
            username: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Change Username',
                config: {
                    name: 'username_input',
                    type: 'text',
                    placeholder: '',
                    autoComplete: 'off',
                    autoFocus: true
                },
                validation: {
                    required: false,
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
                labelText: 'Change Password',
                config: {
                    name: 'password_input',
                    type: 'text',
                    placeholder: '',
                    autoComplete: 'off',
                    autoFocus: true
                },
                validation: {
                    required: false,
                    minLength: 0
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Change Email',
                config: {
                    name: 'email_input',
                    type: 'text',
                    placeholder: '',
                    autoComplete: 'off',
                    autoFocus: true
                },
                validation: {
                    required: false,
                    minLength: 0
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (newState) => {
        this.setState({
            formData: newState
        })
    }

    submitChanges = (e) => {
        // e.preventDefaults();

        // console.log('pressed the button');

        let dataToChange = {};

        for (let key in this.state.formData) {
            if (this.state.formData[key].value.length > 0) {
                dataToChange[key] = this.state.formData[key].value
                // console.log(this.state.formData[key].value);
            }
        }
        
        this.props.changeUserInfo(this.props.user, dataToChange);
    }


    render() {
        return (

            <div className={cx("container-fluid", styles.listContainer)}>
                <div className="row">
                    <div className={cx("col-md-3", styles.userSection)}>
                        <img src={require(`../../assets/images/${this.props.user.profile_pic}`)} alt=""/>
                        <span className={styles.username}>{this.props.user.username}</span>
                        
                    </div>
                    <div className={cx("col-md-6", styles.formSection)}>
                        <FormFields
                            formData={this.state.formData}
                            onblur={null}
                            change={(newState) => {
                                this.updateForm(newState);
                            }}
                            styles={styles}
                        />
                    </div>
                    <div className={cx("col-md-3", styles.submitSection)}>
                        <button className={cx('btn', 'btn-primary')} onClick={this.submitChanges}>Submit Changes</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        responseToChangingInfo: state.users.response
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeUserInfo}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(AdminUserInformationTab);


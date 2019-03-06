import React, { Component } from 'react';

import styles from '../../scss-modules/admin-container/users_list.module.scss';

import FormFields from '../../widgets/Forms/formfields';

import AdminUserInformationTab from './adminUserInformationTab';

class UsersTabContent extends Component {

    // listOfUsers = this.props.users;

    state = {
        listOfUsers: [],
        inputValue: '',
        formData: {
            username: {
                element: 'input',
                value: '',
                label: false,
                labelText: '',
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
        }
    }

    renderListOfUsers = (users) => {
        return users.map( (item, i) => {
            return (
                <div key={i}>
                    <AdminUserInformationTab
                        user={item}
                    />
                </div>
            );
        })
    }

    
    componentWillMount() {
        this.setState({
            listOfUsers: this.props.users
        })
    }
    
    updateForm = (newState) => {
        // e.preventDefaults();
        this.setState({
            formData: newState
        })
        // console.log(this.state.formData.username.value);
        const newUsers = this.props.users.filter( (item) => {
            return item.username.indexOf(this.state.formData.username.value) >= 0
        })

        this.setState({
            listOfUsers: newUsers
        })
    }

    render() {

        // console.log(this.props);

        return (
            <div className={styles.userContainer}>
                <span>
                    Search for a user: 
                    <FormFields
                        formData={this.state.formData}
                        onblur={null}
                        change={(newState) => {
                            this.updateForm(newState);
                        }}
                        styles={styles}
                    />
                </span>
                <div className={styles.allUsers}>
                    {this.renderListOfUsers(this.state.listOfUsers)}
                </div>
                
                
            </div>
        );
    }
}

export default UsersTabContent;

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getAllUsers } from '../actions/index';
import { bindActionCreators } from 'redux';

import cx from 'classnames';
import styles from '../scss-modules/admin-container/admin_container.module.scss';


import AdminPortalTabs from './adminPortal/admin_portal_tab_content';


class AdminPortalContainer extends Component {


    componentWillMount() {
        this.props.getAllUsers();
    }

    renderTabs = () => {
        if (this.props.allUsers) {
            return (
                <div>
                    <AdminPortalTabs 
                        users={this.props.allUsers}
                    />
                </div>
            );
        }
    }

    render() {
    
        console.log(this.props);

        return (
            <div>

                <div className={cx("container-fluid", styles.adminContainer)}>
                    <div className="row">
                        <div className={cx("col-12")}>
                            {this.renderTabs()}
                        
                        
                        </div>
                    </div>
                </div>

     
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currUser: state.currUser.info,
        allUsers: state.users.usersList
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getAllUsers}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(AdminPortalContainer);

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getAllUsers } from '../actions/index';
import { bindActionCreators } from 'redux';

import cx from 'classnames';
import styles from '../scss-modules/admin-container/admin_container.module.scss';

class AdminPortalContainer extends Component {

    renderCurrUser = () => {
        if (this.props.currUser) {
            return (
                <div style={{
                    color: 'red'
                }}>
                    {this.props.currUser.username}
                </div>
            );
        }
    }

    componentWillMount() {
        this.props.getAllUsers();
    }

    render() {
    
        console.log(this.props);

        return (
            <div>
                {/* {this.renderCurrUser()}  */}

                <div className={cx("container-fluid", styles.adminContainer)}>
                    <div className="row">
                        <div className={cx("col-12")}>
                            Hello
                        
                        
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

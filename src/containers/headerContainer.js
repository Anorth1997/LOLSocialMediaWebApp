import React, { Component } from 'react';

import cx from 'classnames';

import styles from '../scss-modules/header/header.module.scss';

import { NavLink, Link } from 'react-router-dom';
import ProfilePictureContainer from './Reusables/profile_picture_container';

import { connect } from 'react-redux';
// import {  } from '../actions/index';
import { bindActionCreators } from 'redux';


class HeaderContainer extends Component {

    renderAdminHeader = () => {
        if (this.props.currUser) {
            if (this.props.currUser.username === 'admin') {
                return (
                    <li>
                        <NavLink to="/adminportal">Admin Portal</NavLink>
                    </li>
                );
            }
        }
    }

    render() {
        return (

            <div className={cx("container-fluid", styles.headerContainer)}>
                <div className={cx("row", "", styles.rowStyles)}>
                    <div className="col-2">
                        <Link to="/" id={styles.explore}>Explore▼</Link>
                    
                    </div>
                    <div className={cx("col-8")}>
                        
                        <ul className={cx("nav", "justify-content-center", styles.middleNav)}>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/find">Find Others</NavLink>
                            </li>
                            <li>
                                <NavLink to="/tournaments">Tournaments</NavLink>
                            </li>
                            {this.renderAdminHeader()}
                            
                        </ul>

                    </div>
                    <div className={cx("col-2", "", styles.rightNav)}>
                        
                        <ProfilePictureContainer hoverPopup={true}/>

                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        currUser: state.currUser.info
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

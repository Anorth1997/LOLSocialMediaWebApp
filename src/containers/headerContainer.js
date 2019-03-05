import React, { Component } from 'react';

import cx from 'classnames';

import styles from '../scss-modules/header/header.module.scss';

import { NavLink } from 'react-router-dom';
import ProfilePictureContainer from './Reusables/profile_picture_container';


class HeaderContainer extends Component {

    render() {
        return (

            <div className={cx("container-fluid", styles.headerContainer)}>
                <div className={cx("row", "", styles.rowStyles)}>
                    <div className="col-sm-2">
                        <a href="" id={styles.explore}>Explore▼</a>
                    
                    </div>
                    <div className={cx("col-sm-8")}>
                        
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
                            
                        </ul>

                        
                        

                    </div>
                    <div className={cx("col-sm-2", "", styles.rightNav)}>
                        
                        <ProfilePictureContainer />

                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderContainer;
import React, { Component } from 'react';

import cx from 'classnames';

import styles from '../scss-modules/header/header.module.scss';

import { NavLink } from 'react-router-dom';


class HeaderContainer extends Component {

    render() {
        return (

            <div className={cx("container-fluid", styles.headerContainer)}>
                <div className={cx("row", styles.rowStyles)}>
                    <div className="col-md-2">

                    
                    </div>
                    <div className={cx("col-md-8")}>
                        
                        <ul className={cx("nav", "justify-content-center", styles.middleNav)}>
                            <li>
                                <NavLink to="/">Hello</NavLink>
                            </li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>

                        


                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        );
    }
}

export default HeaderContainer;
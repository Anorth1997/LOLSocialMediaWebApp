import React, { Component } from 'react';

import cx from 'classnames';

import { NavLink } from 'react-router-dom';

import styles from '../scss-modules/footer/footer.module.scss';


import FontAwesome from 'react-fontawesome';


class FooterContainer extends Component {

    render() {
        return (

            <div className={cx("container-fluid", styles.footerContainer)}>
                <div className={cx("row", "justify-content-end", styles.rowStyles)}>
                    <div className="col-12">
                        <span> 

                             <FontAwesome 
                                className={styles.bottomNavIcon}
                                name='user'
                            />

                            <FontAwesome 
                                className={styles.bottomNavIcon}
                                name='comment'
                            />

                            <FontAwesome 
                                className={styles.bottomNavIcon}
                                name='trophy'
                            />


                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterContainer;
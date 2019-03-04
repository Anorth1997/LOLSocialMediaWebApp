import React, { Component } from 'react';
import cx from 'classnames';


import styles from '../scss-modules/user-page-container/user-page-container.module.scss'

class UserHomePageContainer extends Component {
    state = {
        friends: 0,
        private_message: 0,
        upcoming_tournament: 0
    }

    renderTemplate = (state) => {
        return (
            <div>
                <div className = {cx("row", styles.middle_chunk)}>
                    <div className = {cx("col-2", "border", "border-dark")}>patch notes</div>
                    <div className = {cx("col-10", "border", "border-dark")}>patch notes details</div>
                </div>
                <div className = {cx("row", "border", "border-dark", styles.bottom_footer)}>footer</div>
            </div>
        )
    }

    render() {
        console.log(this.props);
        return (
            <div className = {styles.bg}>
                user home page container 
                <div className = {"container-fluid"}>
                    <div className = "row">
                        <div className = "col"></div>
                        <div className = {cx("col-8", styles.container_frame)}>

                            {this.renderTemplate(this.state)}
                        
                        </div>
                        <div className = "col"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHomePageContainer;
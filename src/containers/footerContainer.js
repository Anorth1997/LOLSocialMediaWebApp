import React, { Component } from 'react';

import cx from 'classnames';

import { Navbar, Nav } from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { faTrophy, faComment, faExclamation, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import styles from '../scss-modules/footer/footer.module.scss';

import MessageBox from '../Components/FooterBoxes/MessageBox';
import ChatPickerContainer from '../Components/FooterBoxes/ChatPickerContainer';
// import { bindActionCreators } from 'redux';
// import ChatPickerContainer from '../';
// import ChatPickerContainer from './../Widgets/ChatPickerContainer';

// import FontAwesome from 'react-fontawesome';


class Footer extends Component {

    state = {
        showFriends: false,
        showMessages: false,
        showTournaments: false,
        showNotifications: false
    }

    setStatesFalse = () => {
        this.setState({
            showFriends: false,
            showMessages: false,
            showTournaments: false,
            showNotifications: false
        })
    }

    renderBottomTemplate = () => {
        return (
            <div>
                <div 
                    className={cx(styles.popup)} 
                    style={{
                        display: this.state.showMessages ? 'block' : 'none'
                    }}
                >
                    <div className={cx("container-fluid")}>
                        <div className="row">
                            <div className={cx("col-3", styles.noPadding, styles.chatPickerContainer)}>
                            {console.log(this.props.currUser)}
                                <ChatPickerContainer 
                                    friends={this.props.currUser.friends}
                                />
                            </div>
                        
                            <div className={cx("col-9", styles.noPadding)}>
                                <MessageBox 
                                    currUser={this.props.currUser}
                                />    
                            </div>

                        </div>
                    
                    </div>
                    
                </div>
                <div 
                    className={cx(styles.popup)} 
                    style={{
                        display: this.state.showFriends ? 'block' : 'none'
                    }}
                >
                    This is the popup for friends
                </div>
                <div 
                    className={cx(styles.popup)} 
                    style={{
                        display: this.state.showTournaments ? 'block' : 'none'
                    }}
                >
                    This is the popup for tournaments
                </div>
                <div 
                    className={cx(styles.popup)} 
                    style={{
                        display: this.state.showNotifications ? 'block' : 'none'
                    }}
                >
                    This is the popup for notifications
                </div>


                <Navbar expand="lg" variant="light" fixed="bottom" className={styles.bottomNavBar}>
                    <Nav style={{ display: "inline-block" }}>

                        {[faUserFriends, faComment, faTrophy, faExclamation]
                            .map((icon, i) => {
                                return (
                                    <div className={styles.navLink} key={i}>
                                        <FontAwesomeIcon
                                            className={styles.iconStyle}
                                            icon={icon}
                                            onClick={() => {
                                                // console.log('hellohello')
                                                if (this.checkConditional(i)) {
                                                    this.setStatesFalse()
                                                } else {
                                                    this.setState({
                                                        showFriends: i===0 ? true : false,
                                                        showMessages: i===1 ? true : false,
                                                        showTournaments: i===2 ? true : false,
                                                        showNotifications: i===3 ? true : false
                                                    })
                                                }
                                            }}
                                        />
                                    </div>
                                )
                            })
                        }    
                    </Nav>
                </Navbar>
            </div>
        )
    }

    /**
     * helper
     */
    checkConditional = (i) => {
        switch(i) {
            case 0:
                return this.state.showFriends ? true : false;
            case 1:
                return this.state.showMessages ? true : false;
            case 2:
                return this.state.showTournaments ? true : false;
            case 3:
                return this.state.showNotifications ? true : false;
            default: 
                return true;
        }
    }

    render() {
        // console.log('rendering')
        // console.log(this.props)
        console.log(this.state)
        // console.log(this.props.location.pathname);
        switch (this.props.location.pathname) {
            case "/login":
                return null;
            default:
                if (this.props.currUser) {
                    return this.renderBottomTemplate();
                }
                return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currUser: state.currUser.info
    }
}

export default withRouter(connect(mapStateToProps, null)(Footer));

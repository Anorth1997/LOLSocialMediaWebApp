import React, { Component } from 'react';

import styles from '../../scss-modules/main-landing-page/user_dashboard.module.scss';
// import cx from 'classnames';


import { Tab, Row, Col, Nav } from 'react-bootstrap';
import PatchNotes from './patchNotes';
import TournamentUserProfileTab from '../UserProfilePage/tournamentProfileTab';

class UserDashboard extends Component {


    render() {

        return (
            <div>

                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3} className={styles.columnLeft}>
                            <Nav variant="pills" className={styles.navLeft}>
                                <Nav.Item className={styles.navItem}>
                                    <Nav.Link eventKey="first">Patch Notes</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className={styles.navItem}>
                                    <Nav.Link eventKey="second">Tournaments</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <PatchNotes />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <TournamentUserProfileTab {...this.props}/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>;
                
            </div>
        );
    }
}

export default UserDashboard;
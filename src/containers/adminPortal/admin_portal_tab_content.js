import React, { Component } from 'react';

import { Tabs, Tab } from 'react-bootstrap';


import UsersAdminTabContent from './usersTabContent';


class AdminPortalTabContent extends Component {


    
    render() {

        return (
            <div>

                <Tabs defaultActiveKey="games" id="uncontrolled-tab-example">
                    <Tab eventKey="users" title="Users">
                        <UsersAdminTabContent 
                            users={this.props.users}
                        />
                    </Tab>

                    <Tab eventKey="tournaments" title="Tournaments">
                        <div>
                            Tournaments
                        </div>
                    </Tab>

                    <Tab eventKey="teams" title="Teams">
                        <div>
                            Teams
                        </div>
                    </Tab>
                    
                </Tabs>

            </div>
        );
    }
}

export default AdminPortalTabContent;
import React from 'react';


import UserProfileTabConentContainer from '../../containers/userProfile/user_profile_tab_content';

const UserProfileTabContent = (props) => {
    return (
        <div>
            <UserProfileTabConentContainer {...props}/>
        </div>
    );
}

export default UserProfileTabContent;

import React from 'react';

import UserProfilePageContainer from '../../containers/profile_page_container';

const UserProfilePage = (props) => {

   //console.log(props.match)
    return (
        <div>
            <UserProfilePageContainer {...props}/>
        </div>
    );
}

export default UserProfilePage;

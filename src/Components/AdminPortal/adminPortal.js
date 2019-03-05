import React from 'react';
import AdminPortalContainer from '../../containers/adminPortalContainer';


const AdminPortal = (props) => {
    return (
        <div>
            <AdminPortalContainer {...props}/>
        </div>
    );
}

export default AdminPortal;
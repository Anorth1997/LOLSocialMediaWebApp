import { combineReducers } from 'redux';

import users from './users_reducer';

import currUser from './curr_user_reducer';

const rootReducer = combineReducers({

    users,
    currUser
});

export default rootReducer;
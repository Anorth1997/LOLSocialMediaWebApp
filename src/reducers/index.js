import { combineReducers } from 'redux';

import users from './users_reducer';

import currUser from './curr_user_reducer';

import tournaments from './tournaments_reducer';
const rootReducer = combineReducers({

    users,
    currUser,
    tournaments
});

export default rootReducer;
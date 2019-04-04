import { combineReducers } from 'redux';

import users from './users_reducer';
import currUser from './curr_user_reducer';
import tournaments from './tournaments_reducer';
import teams from './teams_reducer';
import userUiReducer from './user_ui_reducer';

const rootReducer = combineReducers({

    users,
    currUser,
    tournaments,
    teams,
    userUiReducer
});

export default rootReducer;
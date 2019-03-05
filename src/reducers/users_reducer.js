export default function(state={}, action) {

    switch(action.type) {
        case "GET_ALL_USERS":
            return {...state, usersList: action.payload}

        case "GET_USER_BY_USERNAME":
            return {...state, user: action.payload}

        case "GET_USER_BY_EMAIL":
            return {...state, usersList: action.payload}

        case "GET_USER_BY_ID":
            return {...state, usersList: action.payload}

        default:
            return state;
    }
}
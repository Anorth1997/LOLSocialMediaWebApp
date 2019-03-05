export default function(state={}, action) {

    switch(action.type) {
        case "GET_USER_BY_USERNAME_AND_PASSWORD": 
            return {...state, info: action.payload}
        case "LOG_OUT": {
            // console.log(action.payload)
            return {...state, info: action.payload}
        }
        default:
            return state;
    }

    
}
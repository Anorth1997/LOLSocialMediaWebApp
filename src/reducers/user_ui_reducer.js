export default function (state = {}, action) {
    switch (action.type) {
        case "CHANGE_CURRENT_ACTIVE_CHAT":
            return {...state, activeChat: action.payload}
        default:
            return state;
    }
}
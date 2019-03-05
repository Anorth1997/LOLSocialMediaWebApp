export default function(state={}, action) {

    switch(action.type) {
        case "GET_TEAMS_BY_IDS":
            return {...state, teams: action.payload}
        case "GET_TEAM_BY_ID":
            return {...state, team: action.payload}
        default:
            return state;
    }
}
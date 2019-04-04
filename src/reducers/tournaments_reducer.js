export default function(state={}, action) {

    switch(action.type) {
        case "GET_TOURNAMENT_BY_ID":
            return {...state, tournament: action.payload}
        case "GET_TOURNAMENTS_PARTICIPATED_BY_IDS":
            return {...state, tourns_participated: action.payload}
        case "GET_TOURNAMENTS_PARTICIPATING_BY_IDS":
            return {...state, currTournaments: action.payload}



        default:
            return state;
    }
}
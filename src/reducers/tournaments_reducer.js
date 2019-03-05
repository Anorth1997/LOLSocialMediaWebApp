export default function(state={}, action) {

    switch(action.type) {
        case "GET_TOURNAMENT_BY_ID":
            return {...state, tournament: action.payload}
        case "GET_TOURNAMENTS_BY_IDS":
            return {...state, tournaments: action.payload}

        default:
            return state;
    }
}
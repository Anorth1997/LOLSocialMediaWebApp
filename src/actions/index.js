
import { users, tournaments, teams, brackets } from '../dummy_hardcoded_data';


// ####################### User methods #######################

export function getAllUsers() {

    //do a request

    //return this object
    return {
        type: 'GET_ALL_USERS',
        payload: users
    }
}

export function getUserByUsername(username) {

    const user = users.find( (item) => {
        return item.username === username;
    })

    return {
        type: 'GET_USER_BY_USERNAME',
        payload: user
    }
}

export function getUserByEmail(email) {

    const user = users.find( (item) => {
        return item.email === email;
    })

    return {
        type: 'GET_USER_BY_EMAIL',
        payload: user
    }
}

export function getUserById(id) {

    const user = users.find( (item) => {
        return item.id === id;
    })

    return {
        type: 'GET_USER_BY_ID',
        payload: user
    }
}

export function logOut() {
    const user = undefined;
    return {
        type: 'LOG_OUT',
        payload: user
    }
}

export function tryLoggingIn(username, password) {
    const user = users.find( (item) => {
        console.log('in actions');
        return (item.username === username || item.email === username) && item.password === password;
    })

    console.log(user);

    return {
        type: 'GET_USER_BY_USERNAME_AND_PASSWORD',
        payload: user
    }
}


// ####################### tournament methods #######################

/**
 * 
 * @param {Array of ids} ids 
 * @param {*} type 
 */
export function getAllTournaments(ids, type) {

    const results = tournaments.filter( (item) => {
        return ids.includes(item.id)
    })

    let returnType = ''; 
    if (type === 'participated') {
        returnType = 'GET_TOURNAMENTS_PARTICIPATED_BY_IDS';
    } else {
        returnType = 'GET_TOURNAMENTS_PARTICIPATING_BY_IDS';
    }

    return {
        type: returnType,
        payload: results
    }
}

export function getTournamentById(id) {

    console.log('in action')

    const tournament = tournaments.find( (item) => {
        // console.log(`item.id: ${item.id}, id given: ${id}`);
        return item.id === id;
    })

    return {
        type: 'GET_TOURNAMENT_BY_ID',
        payload: tournament
    }
}


// ####################### Team methods #######################

export function getAllTeams() {

    return {
        type: 'GET_ALL_TEAMS',
        payload: teams
    }
}

export function getTeamById(id) {

    const team = teams.find( (item) => {
        return item.id === id;
    })

    return {
        type: 'GET_TEAM_BY_ID',
        payload: team
    }
}


// ####################### Brackets methods #######################

export function getAllBrackets() {

    return {
        type: 'GET_ALL_BRACKETS',
        payload: brackets
    }
}

export function getBracketeById(id) {

    const bracket = brackets.find( (item) => {
        return item.id === id;
    })

    return {
        type: 'GET_BRACKET_BY_ID',
        payload: bracket
    }
}


import { users, tournaments, teams, brackets } from '../dummy_hardcoded_data';


// ####################### User methods #######################

export function getAllUsers() {

    // this will only be used for the front-end part of the project
    // since we cannot send requests to an external server
    const result = users;

    //return this object
    return {
        type: 'GET_ALL_USERS',
        payload: result
    }
}

export function getUserByUsername(username) {

    // this will only be used for the front-end part of the project
    // since we cannot send requests to an external server
    const user = users.find( (item) => {
        return item.username === username;
    })

    //a request will be made to the server right here when we program our backend
    //for example axios.get(`url/username).then( (response) => {
        // return {
        //     type: 'GET_USER_BY_USERNAME',
        //     payload: response.data
        // }
    // })

    return {
        type: 'GET_USER_BY_USERNAME',
        payload: user
    }
}

export function getUserByEmail(email) {

    // this will only be used for the front-end part of the project
    // since we cannot send requests to an external server
    const user = users.find( (item) => {
        return item.email === email;
    })

    //a request will be made to the server right here when we program our backend
    //for example axios.get(`url/email).then( (response) => {
        // return {
        //     type: 'GET_USER_BY_EMAIL',
        //     payload: response.data
        // }
    // })

    return {
        type: 'GET_USER_BY_EMAIL',
        payload: user
    }
}

export function getUserById(id) {

    // this will only be used for the front-end part of the project
    // since we cannot send requests to an external server
    const user = users.find( (item) => {
        return item.id === id;
    })

    //a request will be made to the server right here when we program our backend
    //for example axios.get(`url/id).then( (response) => {
        // return {
        //     type: 'GET_USER_BY_ID',
        //     payload: response.data
        // }
    // })

    return {
        type: 'GET_USER_BY_ID',
        payload: user
    }
}

export function changeUserInfo(user, newInfo) {

    // After we program our back end, this part will
    // change the users information and return true or false if it was successful

    let response = true;

    console.log('user:')
    console.log(user);
    console.log('New Information')
    console.log(newInfo)

    //a request will be made to the server right here when we program our backend
    return {
        type: 'CHANGE_USER_INFO',
        payload: response
    }
}

export function logOut() {
    const user = undefined;

    //a request will be made to the server right here when we program our backend
    return {
        type: 'LOG_OUT',
        payload: user
    }
}

export function changePassword(id, password) {
    // Password will be changed here after we programmed our backend
    

    //a request will be made to the server right here when we program our backend
    return {
        type: 'CHANGE_PASSWORD',
        payload: undefined
    }
}

export function changeEmail(id, email) {
    // email will be changed here after we programmed our backend
    

    //a request will be made to the server right here when we program our backend
    return {
        type: 'CHANGE_EMAIL',
        payload: undefined
    }
}

export function tryLoggingIn(username, password) {

    // this will only be used for the front-end part of the project
    // since we cannot send requests to an external server
    const user = users.find( (item) => {
        console.log('in actions');
        return (item.username === username || item.email === username) && item.password === password;
    })

    // console.log(user);

    //a request will be made to the server right here when we program our backend
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

    // this will only be used for the front-end part of the project
    // since we cannot send requests to an external server
    const results = tournaments.filter( (item) => {
        return ids.includes(item.id)
    })

    let returnType = ''; 
    if (type === 'participated') {
        returnType = 'GET_TOURNAMENTS_PARTICIPATED_BY_IDS';
    } else {
        returnType = 'GET_TOURNAMENTS_PARTICIPATING_BY_IDS';
    }

    //a request will be made to the server right here when we program our backend
    return {
        type: returnType,
        payload: results
    }
}

export function getTournamentById(id) {

    // console.log('in action')

    // this will only be used for the front-end part of the project
    // since we cannot send requests to an external server
    const tournament = tournaments.find( (item) => {
        // console.log(`item.id: ${item.id}, id given: ${id}`);
        return item.id === id;
    })

    //a request will be made to the server right here when we program our backend
    return {
        type: 'GET_TOURNAMENT_BY_ID',
        payload: tournament
    }
}


// ####################### Team methods #######################

export function getAllTeams(ids) {

    // console.log('in heer')

    // this will only be used for the front-end part of the project
    // since we cannot send requests to an external server
    const results = teams.filter( (item) => {
        return ids.includes(item.id)
    })

    //a request will be made to the server right here when we program our backend
    return {
        type: 'GET_TEAMS_BY_IDS',
        payload: results
    }
}

export function getTeamById(id) {

    // this will only be used for the front-end part of the project
    // since we cannot send requests to an external server
    const team = teams.find( (item) => {
        return item.id === id;
    })

    //a request will be made to the server right here when we program our backend
    return {
        type: 'GET_TEAM_BY_ID',
        payload: team
    }
}


// ####################### Brackets methods #######################

export function getAllBrackets() {

    //a request will be made to the server right here when we program our backend
    return {
        type: 'GET_ALL_BRACKETS',
        payload: brackets
    }
}

export function getBracketeById(id) {

    // this will only be used for the front-end part of the project
    // since we cannot send requests to an external server
    const bracket = brackets.find( (item) => {
        return item.id === id;
    })

    //a request will be made to the server right here when we program our backend
    return {
        type: 'GET_BRACKET_BY_ID',
        payload: bracket
    }
}

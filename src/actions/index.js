import { backendRootLink } from '../secret/config';
import { users, tournaments, teams, brackets } from '../dummy_hardcoded_data';
import axios from 'axios';

// ####################### User methods #######################

export function getAllUsers(ids) {

    const req = axios.put(`${backendRootLink}/getUsersByIds`, {
        ids: ids
    })

    return req.then(res => {
        return {
            type: 'GET_USERS_BY_IDS',
            payload: res.data
        }
    });
}

export function getEveryUser() {

    const req = axios.get(`${backendRootLink}/getEveryUser`)

    return req.then(res => {
        return {
            type: 'GET_USERS_BY_IDS',
            payload: res.data
        }
    });
}

export function getAllIncomingUsers(ids) {

    const req = axios.put(`${backendRootLink}/getUsersByIds`, {
        ids: ids
    })

    return req.then(res => {
        return {
            type: 'GET_INCOMING_USERS_BY_IDS',
            payload: res.data
        }
    });
}

export function getUserByUsername(username) {

    
    const req = axios.put(`${backendRootLink}/searchUser?username=${username}`)
    return req.then(res => {
        return {
            type: 'GET_USER_BY_USERNAME',
            payload: res.data
        }
    })
    
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

export function changePassword(_id, password, newPassword) {
    // Password will be changed here after we programmed our backend
    const req = axios.put(`${backendRootLink}/modify/user/password`, {
        _id: _id,
        password,
        newPassword
    })
    return req.then(res => {
        alert('Successfully changed password');
        return {
            type: 'CHANGE_PASSWORD',
            payload: undefined
        }
    }).catch(err => {
        alert('Error changing password. Old password is incorrect.');
        return {
            type: 'CHANGE_PASSWORD',
            payload: undefined
        }
    })
    
}

export function changeEmail(_id, newEmail) {
    // email will be changed here after we programmed our backend
    const req = axios.put(`${backendRootLink}/modify/user/info`, {
        _id: _id,
        newEmail
    })

    return req.then(res => {
        return {
            type: 'CHANGE_EMAIL',
            payload: undefined
        }
    })
    
    
}

export function tryLoggingIn(username, password) {

    const req = axios.put(`${backendRootLink}/login`, {
        username,
        password
    })
    // console.log(user);

    //a request will be made to the server right here when we program our backend
    
    return req.then(res => {
        return {
            type: 'GET_USER_BY_USERNAME_AND_PASSWORD',
            payload: res.data
        }
    });
}


// ####################### tournament methods #######################

/**
 * 
 * @param {Array of ids} ids 
 */
export function getAllTournaments(ids) {


    const req = axios.put(`${backendRootLink}/getTournamentsByIds`, {
        ids: ids
    })

    console.log(ids)

    return req.then(res => {
        return {
            type: 'GET_TOURNAMENTS_PARTICIPATING_BY_IDS',
            payload: res.data
        }
    });
}

export function getTournamentById(id) {

    const req = axios.get(`${backendRootLink}/getTournamentById?id=${id}`)

    return req.then(res => {
        return {
            type: 'GET_TOURNAMENT_BY_ID',
            payload: res.data
        }
    })
}


// ####################### Team methods #######################

export function getAllTeams(ids) {

    const req = axios.put(`${backendRootLink}/getTeamsByIds`,{ 
        ids
    })

    return req.then(res => {
        console.log(res)
        return {
            type: 'GET_TEAMS_BY_IDS',
            payload: res.data
        }
    })
}

export function getTeamById(id) {

    // this will only be used for the front-end part of the project
    // since we cannot send requests to an external server
    const req = axios.get(`${backendRootLink}/getTeamById?id=${id}`)

    return req.then(res => {
        return {
            type: 'GET_TEAM_BY_ID',
            payload: res.data
        }
    })
}

export function teamAcceptIncomingRequest(_userAcceptingId, _userToAcceptId, _teamId) {

    const req = axios.put(`${backendRootLink}/modify/team/acceptIncomingRequest`, {
        _userAcceptingId,
        _userToAcceptId,
        _teamId
    })

    return req.then(res => {
        alert("Successfully accept player");
        return {
            type: 'TEAM_ACCEPT_PLAYER',
            payload: undefined
        }
    }).catch(err => {
        alert('Error accepting player')
        return {
            type: 'TEAM_ACCEPT_PLAYER',
            payload: undefined
        }
    })
}

export function teamRejectIncomingRequest(_userRejectingId, _userToRejectId, _teamId) {

    const req = axios.put(`${backendRootLink}/modify/team/rejectIncomingRequest`, {
        _userRejectingId,
        _userToRejectId,
        _teamId
    })
//
    return req.then(res => {
        alert("Successfully reject player");
        return {
            type: 'TEAM_REJECT_PLAYER',
            payload: undefined
        }
    }).catch(err => {
        alert('Error rejecting player')
        return {
            type: 'TEAM_REJECT_PLAYER',
            payload: undefined
        }
    })
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

/**
 * 
 * @param {*} friendId Friend Id to switch the current chat to
 */
export function changeCurrentActiveChat(friendId) {


    return {
        type: 'CHANGE_CURRENT_ACTIVE_CHAT',
        payload: friendId
    }
}
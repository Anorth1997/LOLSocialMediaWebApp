// dependencies
const HttpStatus = require('http-status-codes')
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { createConvoId } = require('../firebase-methods/index');
// models
let UserModel = require('../models/user.model');
let TournamentModel = require('../models/tournament.model');
let TeamModel = require('../models/team.model');


// let TournamentModel = require('../models/tournament.model');

const router = express.Router();
const BCRYPT_SALT_ROUNDS = 11;


//###################### user modification endpoints #########################
router.put('/modify/user/info', (req, res) => {

    const { _id, leagueUsername, currentRank, newEmail } = req.body;

    UserModel.findOneAndUpdate({
        _id
    }, { leagueUsername, currentRank, email: newEmail }, { new: true }, (err, doc) => {
        if (err) return res.status(HttpStatus.NOT_FOUND).json({ err: "Could not find the user to modify" })
        return res.status(HttpStatus.OK).json(doc);
    })
    .catch(err => {
        if (err) return res.status(HttpStatus.NOT_FOUND).json({ err: "Could not find the user to modify" })
    })
})

//password change
router.put('/modify/user/password', (req, res) => {

    const { _id, password, newPassword } = req.body;

    UserModel.findOne({
        _id
    }, (err, user) => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err: "Error finding the doc to change the password of" })
        if (!user) return res.status(HttpStatus.NOT_FOUND).json({ err: "Could not find the user in the database" })

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err: "Error comparing passwords" });

            if (isMatch) {

                bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS)
                    .then((hashedPw) => {
                        user.password = hashedPw;

                        user.save((err) => {
                            if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err)
                            return res.status(HttpStatus.OK).send("Password updated successfully!")
                        })
                    })
                    .catch((err) => {
                        if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error hashing password")
                    })
            } else return res.status(HttpStatus.FORBIDDEN).json({ err: "PW wrong" })
        })
    })
})


router.put('/modify/user/addFriend', (req, res) => {

    const { _id, _friendId } = req.body;

    UserModel.findById(_id, (err) => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Could not find user requesting to add other user")
    }).then((user) => {

        if (listContains(user.friends.currFriends, _friendId, true)) {
            return res.status(HttpStatus.BAD_REQUEST).send("Already friends")
        }

        user.friends.blockedFriends = removeItemFromList(user.friends.blockedFriends, _friendId, false)

        if (listContains(user.friends.outgoingRequests, _friendId, false)) {
            return res.status(400).send("Already have an outgoing request");
        } else {

            if (listContains(user.friends.incomingRequests, _friendId, false)) {
                UserModel.findById(_friendId, (err) => {
                    if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Could not find user requested to add")
                })
                    .then(userAdded => {
                        const convoIdShared = createConvoId();
                        user.friends.currFriends.push({
                            friendId: _friendId,
                            convoId: convoIdShared
                        })
                        userAdded.friends.currFriends.push({
                            friendId: _id,
                            convoId: convoIdShared
                        })

                        user.friends.incomingRequests = removeItemFromList(user.friends.incomingRequests, _friendId, false)
                        userAdded.friends.outgoingRequests = removeItemFromList(userAdded.friends.outgoingRequests, _id, false)
                        return saveBothUsers(user, userAdded, res, "Both users have added each other")
                    })
            } else {
                UserModel.findById(_friendId, (err) => {
                    if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Could not find user requested to add")
                }).then(userAdded => {

                    if (listContains(userAdded.friends.blockedFriends, _id, false)) {
                        user.save()
                            .then(() => {
                                return res.status(HttpStatus.FORBIDDEN).send("User 2 is blocked by requesting user")
                            })
                    } else {
                        user.friends.outgoingRequests.push(_friendId);
                        userAdded.friends.incomingRequests.push(_id)
                        return saveBothUsers(user, userAdded, res, "User 1 has requested to add user 2");
                    }
                }).catch(err => {
                    res.send(err)
                })
            }
        }
    })
})

router.put('/modify/user/deleteFriend', (req, res) => {

    const { _id, _friendId } = req.body;

    UserModel.findById(_id, (err) => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Could not find user requesting to add other user")
    })
        .then((user) => {
            UserModel.findById(_friendId, (err) => {
                if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Could not find user requesting to add other user")
            })
                .then((userBeingDeleted) => {
                    const userListLength = user.friends.currFriends.length;
                    const deletedUserListLength = userBeingDeleted.friends.currFriends.length;
                    user.friends.currFriends = removeItemFromList(user.friends.currFriends, _friendId, true)
                    userBeingDeleted.friends.currFriends = removeItemFromList(userBeingDeleted.friends.currFriends, _id, true)

                    if (userListLength > user.friends.currFriends.length ||
                            deletedUserListLength > userBeingDeleted.friends.currFriends.length) {
                        return saveBothUsers(user, userBeingDeleted, res, "User has successfully deleted other user")
                    } else {
                        return res.status(HttpStatus.BAD_REQUEST).json({err: "They are not friends"})
                    }
                })
        })

})


router.put('/modify/user/blockFriend', (req, res) => {

    const { _id, _friendId } = req.body;

    UserModel.findById(_id, (err) => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Could not find user requesting to add other user")
    })
        .then((user) => {
            UserModel.findById(_friendId, (err) => {
                if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Could not find user requesting to add other user")
            })
                .then((userBeingBlocked) => {
                    user.friends.currFriends = removeItemFromList(user.friends.currFriends, _friendId, true)
                    userBeingBlocked.friends.currFriends = removeItemFromList(userBeingBlocked.friends.currFriends, _id, true)

                    user.friends.incomingRequests = removeItemFromList(user.friends.incomingRequests, _friendId, false)
                    userBeingBlocked.friends.incomingRequests = removeItemFromList(userBeingBlocked.friends.incomingRequests, _id, false)

                    user.friends.outgoingRequests = removeItemFromList(user.friends.outgoingRequests, _friendId, false)
                    userBeingBlocked.friends.outgoingRequests = removeItemFromList(userBeingBlocked.friends.outgoingRequests, _id, false)

                    user.friends.blockedFriends.push(_friendId)
                    return saveBothUsers(user, userBeingBlocked, res, "User successfully blocked other user")
                })
        })
})

router.put('/modify/user/removeBlockedFriend', (req, res) => {

    const { _id, _friendId } = req.body;

    UserModel.findById(_id, (err) => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Could not find user requesting to add other user")
    })
        .then((user) => {
            const length = user.friends.blockedFriends.length;
            user.friends.blockedFriends = removeItemFromList(user.friends.blockedFriends, _friendId, false)
            if (length > user.friends.blockedFriends.length) {
                user.save()
                    .then((user) => {
                        return res.status(HttpStatus.OK).json({
                            blockedFriends: user.friends.blockedFriends
                        })
                    })
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({ err: "User is not blocked" })
            }

        })
})


// user requests to join a team
router.put('/modify/user/requestToJoinTeam', (req, res) => {

    const { _id, _teamId } = req.body;

    TeamModel.findById({_id: _teamId}, (err, team) => {
        if (err || !team) return res.status(HttpStatus.NOT_FOUND).send("Team could not be found")
        // check if the player is already on team or has an outgoing request to him
        // if on team, dont do anything
        if (listContains(team.players.currPlayers, _id, false)) return res.status(HttpStatus.BAD_REQUEST).send("The user is already on the team")
        
        UserModel.findById(_id, (err, user) => {
            if (err || !user) return res.status(HttpStatus.NOT_FOUND).send("Could not find the user")
            // if the team has an outgoing request to him, add him to the team
            if (listContains(team.players.outgoingPlayerRequests, _id, false)) {
                team.players.outgoingPlayerRequests = removeItemFromList(team.players.outgoingPlayerRequests, _id, false)
                user.teams.incomingTeamRequests = removeItemFromList(user.teams.incomingTeamRequests, _teamId, false)
                team.players.currPlayers.push(_id);
                user.teams.currTeams.push(_teamId);
                return saveBothUsers(team, user, res, "THe user has been added to the team successfully")
            } else {
                // else send a request to the team to join it
                team.players.incomingPlayerRequests.push(_id);
                user.teams.outgoingTeamRequests.push(_teamId);
                return saveBothUsers(team, user, res, "THe user has requested to join the team successfully")
            }
        })
    })
})


router.put('/modify/user/requestToJoinTournament', (req, res) => {

    const { _id, _tournamentId } = req.body;

    TournamentModel.findById({_id: _tournamentId}, (err, tournament) => {
        if (err || !tournament) return res.status(HttpStatus.NOT_FOUND).send("Tournament could not be found")
        // check if the player is already on team or has an outgoing request to him
        // if on team, dont do anything
        if (tournament.tournamentType === 'Team') return res.status(HttpStatus.BAD_REQUEST).send("The user must be on a team to join this tournament")

        if (listContains(tournament.participants.currParticipants, _id, false)) return res.status(HttpStatus.BAD_REQUEST).send("The user is already in the tournament")
        
        UserModel.findById(_id, (err, user) => {
            if (err || !user) return res.status(HttpStatus.NOT_FOUND).send("Could not find the user")
            // if the team has an outgoing request to him, add him to the team
            if (listContains(tournament.participants.outGoingParticipants, _id, false)) {
                tournament.participants.outGoingParticipants = removeItemFromList(tournament.participants.outGoingParticipants, _id, false)
                user.tournaments.incomingTournamentRequests = removeItemFromList(user.tournaments.incomingTournamentRequests, _tournamentId, false)
                tournament.participants.currParticipants.push(_id);
                user.tournaments.currTournaments.push(_tournamentId);
                return saveBothUsers(tournament, user, res, "THe user has been added to the tournament successfully")
            } else {
                // else send a request to the team to join it
                tournament.participants.incomingParticipants.push(_id);
                user.tournaments.outgoingTournamentRequests.push(_tournamentId);
                return saveBothUsers(tournament, user, res, "THe user has requested to join the tournament successfully")
            }
        })
    })
})

router.put('/modify/user/leaveTournament', (req, res) => {

    const { _id, _tournamentId } = req.body;

    TournamentModel.findById({_id: _tournamentId}, (err, tournament) => {
        if (err || !tournament) return res.status(HttpStatus.NOT_FOUND).send("Tournament could not be found")
        // check if the player is already on team or has an outgoing request to him
        // if on team, dont do anything

        if (listContains(tournament.participants.currParticipants, _id, false) ||
            listContains(tournament.participants.incomingParticipants, _id, false) || 
            listContains(tournament.participants.outGoingParticipants, _id, false)) {
                UserModel.findById(_id, (err, user) => {
                    if (err || !user) return res.status(HttpStatus.NOT_FOUND).send("Could not find the user")
                    // if the team has an outgoing request to him, add him to the team
                    tournament.participants.currParticipants = removeItemFromList(team.players.currPlayers, _id, false);
                    tournament.participants.incomingParticipants = removeItemFromList(team.privileges.nothing, _id, false);
                    tournament.participants.outGoingParticipants = removeItemFromList(team.privileges.recruiter, _id, false);
                    user.tournaments.currTournaments = removeItemFromList(user.tournaments.currTournaments, _tournamentId, false);
                    user.tournaments.outgoingTournamentRequests = removeItemFromList(user.tournaments.outgoingTournamentRequests, _tournamentId, false);
                    user.tournaments.incomingTournamentRequests = removeItemFromList(user.tournaments.incomingTournamentRequests, _tournamentId, false);

                    return saveBothUsers(tournament, user, res, "User has successfully left the team") 
                })
        } else {
            return res.status(HttpStatus.BAD_REQUEST).send("The user is not in the tournament")
        }
    })
})



router.put('/modify/user/leaveTeam', (req, res) => {

    const { _id, _teamId } = req.body;

    TeamModel.findById({_id: _teamId}, (err, team) => {
        if (err || !team) return res.status(HttpStatus.NOT_FOUND).send("Team could not be found")
        // check if the player is already on team or has an outgoing request to him
        // if on team, dont do anything

        if (listContains(team.privileges.owner, _id, false)) {
            return res.status(HttpStatus.BAD_REQUEST).send("Please pass ownership to someone else before leaving the team")
        }

        if (listContains(team.players.currPlayers, _id, false) ||
            listContains(team.players.outgoingPlayerRequests, _id, false) ||
            listContains(team.players.incomingPlayerRequests, _id, false)) {

            UserModel.findById(_id, (err, user) => {
                if (err || !user) return res.status(HttpStatus.NOT_FOUND).send("Could not find the user")
                // if the team has an outgoing request to him, add him to the team
                team.players.currPlayers = removeItemFromList(team.players.currPlayers, _id, false);
                team.players.outgoingPlayerRequests = removeItemFromList(team.players.outgoingPlayerRequests, _id, false);
                team.players.incomingPlayerRequests = removeItemFromList(team.players.incomingPlayerRequests, _id, false);
                team.privileges.nothing = removeItemFromList(team.privileges.nothing, _id, false);
                team.privileges.recruiter = removeItemFromList(team.privileges.recruiter, _id, false);
                team.privileges.admin = removeItemFromList(team.privileges.admin, _id, false);
                user.teams.currTeams = removeItemFromList(user.teams.currTeams, _teamId, false);
                user.teams.outgoingTeamRequests = removeItemFromList(user.teams.outgoingTeamRequests, _teamId, false);
                user.teams.incomingTeamRequests = removeItemFromList(user.teams.incomingTeamRequests, _teamId, false);
                return saveBothUsers(team, user, res, "User has successfully left the team") 
            })
        } else {
            return res.status(HttpStatus.BAD_REQUEST).send("The user is not on the team or requested/requested to be on the team")
        }
    })
})





//###################### end of user modify #########################



// ##################### Team modify routes #####################


router.put('/modify/team/info', (req, res) => {

    const { _id, name } = req.body;

    TeamModel.findOneAndUpdate({
        _id
    }, { name }, { new: true }, (err, doc) => {
        if (err) return res.status(HttpStatus.NOT_FOUND).json({ err: "Could not find the team to modify" })
        return res.status(HttpStatus.OK).json(doc);
    })
    .catch(err => {
        if (err) return res.status(HttpStatus.NOT_FOUND).json({ err: "Could not find the team to modify" })
    })
})

// a player on the team requests for a user to join the team
router.put('/modify/team/requestUser', (req, res) => {

    const { _id, _requestedUserId, _teamId } = req.body;

    UserModel.findById({_id: _requestedUserId}, (err) => {
        if (err) return res.status(HttpStatus.NOT_FOUND).send("Could not find the user")
    })
    .then((requestedUser) => {
        if (listContains(requestedUser.teams.currTeams, _requestedUserId, false)) {
            return res.status(HttpStatus.BAD_REQUEST).send("The user is already on the team!")
        }
        if (listContains(requestedUser.teams.incomingTeamRequests, _teamId, false)) {
            return res.status(HttpStatus.FORBIDDEN).send("The user is already being requested to join the team")
        }       

        TeamModel.findById({_id: _teamId}, (err) => {
            if (err) return res.status(HttpStatus.NOT_FOUND).send("Could not find the team by its id")
        })
        .then((team) => {

            team.playerAuthorizedToRecruit(_id, function(isAuthorized) {
                if (!isAuthorized) {
                    return res.status(HttpStatus.FORBIDDEN).send("This player cannot recruit others");
                } else {
                    const incomingPlayersLength = team.players.incomingPlayerRequests.length;
                    team.players.incomingPlayerRequests = removeItemFromList(team.players.incomingPlayerRequests, _requestedUserId, false)
                    // console.log(incomingPlayersLength > team.)
                    // console.log('here rn')
                    if (incomingPlayersLength > team.players.incomingPlayerRequests.length) {
                        // console.log('here2')
                        requestedUser.teams.outgoingTeamRequests = removeItemFromList(requestedUser.teams.outgoingTeamRequests, _teamId, false)
                        // console.log(requestedUser.teams.currTeams);
                        requestedUser.teams.currTeams.push(_teamId)
                        
                        team.players.currPlayers.push(_requestedUserId)
                        team.privileges.nothing.push(_requestedUserId)
                        team.totalRank += requestedUser.lolInfo.currentRank;

                        return saveBothUsers(requestedUser, team, res, "requested user has joined the team!")
                    } else {
                        requestedUser.teams.incomingTeamRequests.push(_teamId)
                        team.players.outgoingPlayerRequests.push(_requestedUserId)

                        return saveBothUsers(requestedUser, team, res, "requested user has been requested!")
                    }
                }
            })
        })
        .catch(err => {
            console.log("throwing error...")
            console.log(err);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        })
    })
})



router.put('/modify/team/acceptIncomingRequest', (req, res) => {

    const { _userAcceptingId, _userToAcceptId, _teamId } = req.body;

    TeamModel.findById({_id: _teamId}, (err) => {
        if (err) return res.status(HttpStatus.NOT_FOUND).send("Could not find the team requested")
    })
    .then((team) => {

        if (!listContains(team.players.incomingPlayerRequests, _userToAcceptId, false)) {
            return res.status(Http.BAD_REQUEST).send("This user has never requested to join the team")
        }

        team.playerAuthorizedToAccept(_userAcceptingId, (isAuthorized) => {
            if (!isAuthorized) return res.status(HttpStatus.FORBIDDEN).send("User is not authorized to accept players")

            UserModel.findById({_id: _userToAcceptId}, (err) => {
                if (err) return res.status(HttpStatus.NOT_FOUND).send("Could not find the user to accept into the team")
            })
            .then((userToAccept) => {
                userToAccept.teams.outgoingTeamRequests = 
                    removeItemFromList(userToAccept.teams.outgoingTeamRequests, _teamId, false)
                userToAccept.teams.currTeams.push(_teamId)
                team.players.incomingPlayerRequests = 
                    removeItemFromList(team.players.incomingPlayerRequests, _userToAcceptId, false)        
                team.players.currPlayers.push(_userToAcceptId)
                
                return saveBothUsers(userToAccept, team, res, "requested user has been accepted to the team")
            })


        })
    })

})



// ##################### end of Team modify routes #####################


//###################### Tournament modify #########################


router.put('/modify/tournament/info', (req, res) => {

    const { _id, name } = req.body;
    
    TournamentModel.findOne({
        _id
    }, (err, tournament) => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err: "Error when modifying team" })
        if (!tournament) return res.status(HttpStatus.NOT_FOUND).json({ err: "Could not find the team to modify" })
        if (tournament.hasStarted) {
            return res.status(HttpStatus.FORBIDDEN).send("Cannot modify a tournament that has already started")
        }
        if (name) {
            tournament.name = name;
        }
        tournament.save().then(() => {
            return res.status(HttpStatus.OK).send(tournament)
        }).catch(err => {
            return res.json({ err, msg: "Error when modifying team" }).status(HttpStatus.INTERNAL_SERVER_ERROR)
        })
    })
})


router.put('/modify/tournament/requestUserOrTeam', (req, res) => {

    const { _id, _requestedUserOrTeamId, _tournamentId } = req.body;

    TournamentModel.findById({_id: _tournamentId}, (err) => {
        if (err) return res.status(HttpStatus.NOT_FOUND).send("Could not find the tournament")
    })
    .then(tournament => {

        if (listContains(tournament.participants.currParticipants, _requestedUserOrTeamId, false)) {
            return res.status(HttpStatus.BAD_REQUEST).send("The team/user is already in the tournament")
        }

        if (tournament.tournamentType === 'Team') {
            TeamModel.findById({_id: _requestedUserOrTeamId}, (err, team) => {
                if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error finding team");

                if (listContains(team.tournaments.incomingTournamentRequests, _tournamentId, false)) {
                    // if the tournament is requesting again
                    return res.status(HttpStatus.BAD_REQUEST).send("The team has already been invited")
                } else if (listContains(team.tournaments.outgoingTournamentRequests, _tournamentId, false)) {
                    // team already requested to join team
                    team.tournaments.outgoingTournamentRequests = removeItemFromList(team.tournaments.outgoingTournamentRequests, _tournamentId, false)
                    tournament.participants.incomingParticipants = removeItemFromList(tournament.participants.incomingParticipants, _requestedUserId, false)
                    team.tournaments.currTournaments.push(_tournamentId);
                    tournament.participants.currParticipants.push(_requestedUserOrTeamId);

                    return saveBothUsers(tournament, team, res, "requested team has been accepted to the tournament")
                } else {
                    // outgoing request from tournament, incoming request for team
                    tournament.participants.outGoingParticipants.push(_requestedUserOrTeamId);
                    team.tournaments.incomingTournamentRequests.push(_tournamentId);

                    return saveBothUsers(tournament, team, res, "requested team has been requested to join the team")
                }
            })
        } else {
            UserModel.findById({_id: _requestedUserOrTeamId}, (err, user) => {
                if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error finding team");

                if (listContains(user.tournaments.incomingTournamentRequests, _tournamentId, false)) {
                    // if the tournament is requesting again
                    return res.status(HttpStatus.BAD_REQUEST).send("The user has already been invited")
                } else if (listContains(team.tournaments.outgoingTournamentRequests, _tournamentId, false)) {
                    // team already requested to join team
                    user.tournaments.outgoingTournamentRequests = removeItemFromList(user.tournaments.outgoingTournamentRequests, _tournamentId, false)
                    tournament.participants.incomingParticipants = removeItemFromList(tournament.participants.incomingParticipants, _requestedUserId, false)
                    user.tournaments.currTournaments.push(_tournamentId);
                    tournament.participants.currParticipants.push(_requestedUserOrTeamId);

                    return saveBothUsers(tournament, user, res, "requested team has been accepted to the tournament")
                } else {
                    // outgoing request from tournament, incoming request for team
                    tournament.participants.outGoingParticipants.push(_requestedUserOrTeamId);
                    user.tournaments.incomingTournamentRequests.push(_tournamentId);

                    return saveBothUsers(tournament, user, res, "requested team has been requested to join the team")
                }
            })
        }
    })
})


// router.put('/modify/tournament/removePlayerOrTeam', )


// ##################### End of Tournament modify routes #####################


// ####################### Helpers ##################################


const saveBothUsers = (user1, user2, res, successMessage) => {
    user1.save()
        .then(() => {
            user2.save()
                .then(() => {
                    return res.status(HttpStatus.OK).send(successMessage)
                }).catch(err => {
                    return res.json({ err, msg: "Error with second user adding" }).status(HttpStatus.INTERNAL_SERVER_ERROR)
                })
        })
        .catch(err => {
            return res.json({ err, msg: "Error with first user adding" }).status(HttpStatus.INTERNAL_SERVER_ERROR)
        })
}

const removeItemFromList = (list, value, currFriends) => {

    if (currFriends) {
        return list.filter((item) => {
            return item.friendId.toString() !== value;
        })
    }
    return list.filter((item) => {
        return item.toString() !== value
    })
}

const listContains = (list, value, currFriends) => {

    if (currFriends) {
        return (list.find((item) => {
            return item.friendId.toString() === value
        }) !== undefined)
    } else {
        // console.log(`value: ${value}`)
        return (list.find((item) => {
            // console.log(`item: ${item.toString()}`)
            return item.toString() === value
        }) !== undefined)
    }
}


module.exports = router;
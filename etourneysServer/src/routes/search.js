// dependencies
const HttpStatus = require('http-status-codes')
const express = require('express');

// models
let UserModel = require('../models/user.model');
let TournamentModel = require('../models/tournament.model');
let TeamModel = require('../models/team.model');
// let TournamentModel = require('../models/tournament.model');

const router = express.Router();
const BCRYPT_SALT_ROUNDS = 11;



router.get('/searchUsers', (req, res) => {
    
    const { username, leagueUsername, lowestRank, highestRank, mainRole } = req.query;
    let filters = {}

    if (username) filters.username = { "$regex": username, "$options": "i"};
    if (leagueUsername) filters.leagueUsername = { "$regex": leagueUsername, "$options": "i"};
    if (mainRole) filters.mainRole = mainRole;
    if (highestRank && lowestRank) filters.currentRank = {"$gte": lowestRank, "$lte": highestRank} 
    
    UserModel.find(filters, 'username leagueUsername mainRole currentRank isOnline', (err, users) => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error querying for users with criteria")
        return res.status(HttpStatus.OK).json(users);
    })
})

router.put('/searchUser', (req, res) => {
    
    const { username } = req.query;
    let filters = {}
    if (username) filters.username = { "$regex": username, "$options": "i"};
    UserModel.findOne(filters, (err, user) => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error querying for user with criteria")
        // console.log(user)
        user.updatePlayerRank(user.lolInfo.id, (rank) => {
            console.log(rank)
            user.lolInfo.currentRank = rank;
            user.save().then((doc)=> {
                return res.status(HttpStatus.OK).json({
                    _id: doc._id,
                    leagueUsername: doc.leagueUsername,
                    username: doc.username,
                    emailIsValidated: doc.emailIsValidated,
                    dateCreated: doc.dateCreated,
                    isOnline: doc.isOnline,
                    profile_pic: doc.profile_pic,
                    tournaments: doc.tournaments,
                    teams: doc.teams,
                    lolInfo: doc.lolInfo
                })
            }).catch(err => {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error saving user rank");
            })
            
        })

    })
})

router.put('/getTournamentsByIds', (req, res) => {
    const ids = req.body.ids;
    console.log(req.body)
    if (ids.length > 0) {
        TournamentModel.find({_id: {$in: ids}}, (err, tournaments) => {
            if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error getting tournaments");
            return res.status(HttpStatus.OK).json(tournaments);
        })
    }
})

router.put('/getTeamsByIds', (req, res) => {
    const ids = req.body.ids;
    console.log(req.body)
    if (ids.length > 0) {
        TeamModel.find({_id: {$in: ids}}, (err, teams) => {
            if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error getting teams");
            return res.status(HttpStatus.OK).json(teams);
        })
    }
})

router.get('/searchTournament', (req, res) => {
    
    const { name, hostType, hasStarted, tournamentType, fromDate, toDate } = req.query;
    
    let filters = {}

    if (name) filters.name = { "$regex": name, "$options": "i"};
    if (hostType) filters.hostType = hostType;
    if (hasStarted) filters.hasStarted = hasStarted;
    if (tournamentType) filters.hostType = tournamentType;
    if (fromDate && toDate) filters.dateStarting = {"$gte": lowestRank, "$lte": highestRank} 
    
    TournamentModel.find(filters, 'name hostType hasStarted tournamentType dateStarting', (err, tournaments) => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error querying for teams with criteria")
        return res.status(HttpStatus.OK).json(tournaments);
    })
})

router.get('/searchTeam', (req, res) => {
    
    const { name, lowestRank, highestRank } = req.query;
    let filters = {}

    if (name) filters.name = { "$regex": name, "$options": "i"};
    if (highestRank && lowestRank) filters.averageRank = {"$gte": lowestRank, "$lte": highestRank} 
    
    TeamModel.find(filters, 'name averageRank', (err, teams) => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error querying for teams with criteria")
        return res.status(HttpStatus.OK).json(teams);
    })
})



module.exports = router;
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



router.get('/searchUser', (req, res) => {
    
    const { username, leagueUsername, lowestRank, highestRank, mainRole } = req.query;
    let filters = {}

    if (username) filters.username = { "$regex": username, "$options": "i"};
    if (leagueUsername) filters.leagueUsername = { "$regex": leagueUsername, "$options": "i"};
    if (mainRole) filters.mainRole = mainRole;
    if (highestRank && lowestRank) filters.currentRank = {"$gte": lowestRank, "$lte": highestRank} 
    
    UserModel.find(filters, 'username leagueUsername mainRole currentRank isOnline', (err, users) => {
        if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error querying for users with criteria")
        res.status(HttpStatus.OK).json(users);
    })
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
        if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error querying for teams with criteria")
        res.status(HttpStatus.OK).json(tournaments);
    })
})

router.get('/searchTeam', (req, res) => {
    
    const { name, lowestRank, highestRank } = req.query;
    let filters = {}

    if (name) filters.name = { "$regex": name, "$options": "i"};
    if (highestRank && lowestRank) filters.averageRank = {"$gte": lowestRank, "$lte": highestRank} 
    
    TeamModel.find(filters, 'name averageRank', (err, teams) => {
        if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error querying for teams with criteria")
        res.status(HttpStatus.OK).json(teams);
    })
})



module.exports = router;
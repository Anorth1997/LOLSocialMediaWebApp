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


// router.get('/searchTeam', (req, res) => {
    
//     const { name, leagueUsername, lowestRank, highestRank, mainRole } = req.query;
//     let filters = {}

//     if (username) filters.username = { "$regex": username, "$options": "i"};
//     if (leagueUsername) filters.leagueUsername = { "$regex": leagueUsername, "$options": "i"};
//     if (mainRole) filters.mainRole = mainRole;
//     if (highestRank && lowestRank) filters.currentRank = {"$gte": lowestRank, "$lte": highestRank} 
    
//     UserModel.find(filters, 'username leagueUsername mainRole currentRank isOnline', (err, users) => {
//         if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error querying for users with criteria")
//         res.status(HttpStatus.OK).json(users);
//     })
// })



module.exports = router;
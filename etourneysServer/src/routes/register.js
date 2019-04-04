// dependencies
const HttpStatus = require('http-status-codes')
const express = require('express');
const bcrypt = require('bcrypt');

// models
let UserModel = require('../models/user.model');
let TournamentModel = require('../models/tournament.model');
let TeamModel = require('../models/team.model');
// let TournamentModel = require('../models/tournament.model');

const router = express.Router();
const BCRYPT_SALT_ROUNDS = 11;


router.post('/register/user', (req, res) => {

    const { username, password, email, leagueUsername } = req.body;
    const currDate = Date.now();

    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    .then((hashedPw) => {
        const model = new UserModel({
            username,
            password: hashedPw,
            email, 
            // leagueUsername,
            emailIsValidated: false,
            dateCreated: currDate, 
            lastLogin: currDate
        })
        model.getLeaguePlayerInfo(leagueUsername)
        .then((lolResponse) => {
            // console.log('1')
            // console.log(lolResponse.data)
            model.leagueUsername = leagueUsername;
            model.lolInfo.id = lolResponse.data.id;
            model.lolInfo.puuid = lolResponse.data.puuid;
            model.lolInfo.accountId = lolResponse.data.accountId;
            model.lolInfo.lastUpdated = currDate;
            
            model.updatePlayerRank(model.lolInfo.id, (rank) => {
                model.lolInfo.currentRank = rank;
                model.save()
                .then((doc) => {
                    if (!doc || doc.length === 0) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(doc);
                    return res.status(HttpStatus.CREATED).send("Success")
                })
                .catch((err) => {
                    const { errmsg } = err;
                    console.log(errmsg);
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(errmsg)
                })
            
            })

            
        })
        .catch(err => {
            return res.status(HttpStatus.NOT_FOUND).send("The league of legends user does not exist")
        })
    })
    .catch((err) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err: 'Could not hash password'})
    })

})

router.post('/register/tournament', (req, res) => {
    
    const { name, hostType, hostName, hostId, tournamentType, amountOfTeams, playersPerTeam, dateStarting } = req.body;
    const currDate = Date.now();
    const tournModel = new TournamentModel({
        name,
        hostType,
        hostName,
        hostId,
        tournamentType,
        amountOfTeams,
        playersPerTeam,
        dateCreated: currDate,
        dateStarting
    });
    tournModel.save()
    .then((doc) => {
        if (!doc || doc.length === 0) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(doc)
        return res.status(HttpStatus.OK).send(doc)
    })
    .catch((err) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err)
    })
})

router.post('/register/team', (req, res) => {
    
    const { name, hostId } = req.body;
    const currDate = Date.now();

    UserModel.findById({_id: hostId}, (err) => {
        if (err) return res.status(HttpStatus.NOT_FOUND).send("The user could not be found")
    })
    .then((host) => {

        const teamModel = new TeamModel({
            name,
            hostId,
            players: {
                currPlayers: [hostId]
            },
            dateCreated: currDate,
            privileges: {
                owner: [hostId]
            },
            totalRank: host.lolInfo.currentRank
        });

        teamModel.save()
        .then((doc) => {
            if (!doc) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(doc)
        
            host.teams.currTeams.push(doc._id)
            host.save()
            .then((savedUser) => {
                if (!savedUser) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Could not save user into the databsae")
                return res.status(HttpStatus.OK).send(doc)
            })
        })
        .catch((err) => {
            // console.log('error: ', err)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        })

    })

    

})

module.exports = router;
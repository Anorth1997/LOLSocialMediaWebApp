const axios = require('axios')
const apiKey = require('../../secret/secret').riotApiKey;
const riotApiConstants = require("../internal-lol-api/constants");

// const lolApiMethods = require('../internal-lol-api/methods');
// const TeamModel = require('./team.model');

const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');



/**
 * 
 * @param {String}  username - username of user
 * @param {String}  password - password of user
 * @param {String}  email - email of user
 * @param {String}  league_username - lol ign of user
 * @param {Array}   friends - friends of user
 * @param {Number}  dateCreated - date the user registered
 * @param {Number}  lastLogin - last login timestamp of user
 */
let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxlength: 25,
        minlength: 2
    },
    // validated client side
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        default: undefined
    },
    leagueUsername: {
        type: String,
        required: true,
        unique: true
    },
    lolInfo: {
        currentRank: {
            type: Number,
            default: 0,
        },
        lastUpdated: {
            type: Number
        },
        mainRole: {
            type: String,
            default: "",
            enum: ["TOP", "MID", "JUNGLE", "ADC", "SUPPORT", ""]
        },
        puuid: {
            type: String
        },
        accountId: {
            type: String
        },
        id: {
            type: String
        }
    },
    friends: {
        currFriends: [{
            friendId: {
                
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            convoId: {
                
            },
            friendUsername: {

            }
        }],
        incomingRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: false,
            default: []
        }],
        outgoingRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: false,
            default: []
        }],
        blockedFriends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }]
    },
    teams: {
        currTeams: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            default: []
        }],
        outgoingTeamRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            default: []
        }],
        incomingTeamRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            default: []
        }]
    },
    tournaments: {
        currTournaments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tournament',
            default: []
        }],
        outgoingTournamentRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tournament',
            default: []
        }],
        incomingTournamentRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tournament',
            default: []
        }]
    },
    dateCreated: {
        type: Number,
        required: true
    },
    lastLogin: {
        type: Number,
        required: true
    },
    isOnline: {
        type: Boolean,
        required: true,
        enum: [true, false],
        default: false
    },
    emailIsValidated: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        required: true,
        default: 'profile-pic-1.png'
    }

}, { versionKey: false })

UserSchema.plugin(idValidator);
UserSchema.index({username: 1})



UserSchema.pre('update', (next) => {
    next();
})

UserSchema.methods.getLeaguePlayerInfo = function(leagueUsername) {

    // {
    //     "profileIconId": 654,
    //     "name": "elo over friends",
    //     "puuid": "abmwYJFkJG-1Bq9gqozzCVBRDLqNqu8shIiSUd4C2c02cN1qQGyLIZG0cCTuW_le50D7wVjLXmqMag",
    //     "summonerLevel": 88,
    //     "accountId": "hjbpqqbE1ROqyL3dKj56arPO-9L9urCUAuSdEYtTZxzkDS4",
    //     "id": "tv1ee-F-AEcqTNqC9jkB3hK_R2Od3C6Az9ofPCqwUniWwxw",
    //     "revisionDate": 1553653980000
    // },
    // console.log('here')
    // console.log(`${riotApiConstants.rootRiotApiLink}/lol/summoner/v4/summoners/by-name/${leagueUsername}?api_key=${apiKey}`)
    return axios.get(`${riotApiConstants.rootRiotApiLink}/lol/summoner/v4/summoners/by-name/${encodeURI(leagueUsername)}?api_key=${apiKey}`)
    
}


UserSchema.methods.updatePlayerRank = (leagueUsername, callback) => {
    // console.log('in here')
    if (Date.now() - this.lastUpdated < 1000) return null;
    else {
        axios.get(`${riotApiConstants.rootRiotApiLink}/lol/league/v4/positions/by-summoner/${leagueUsername}?api_key=${apiKey}`) 
        .then(doc => {
            
            const tier = doc.data[0].tier;
            const rank = doc.data[0].rank;
            let rankNum = 0;
            if (tier === 'SILVER') {
                rankNum += 5
            }
            else if (tier === 'GOLD') {
                rankNum += 10
            }
            else if (tier === 'PLATINUM') {
                rankNum += 15
            }
            else if (tier === 'DIAMOND') {
                rankNum += 20
            }
            else if (tier === 'MASTER') {
                rankNum += 26
            }
            else if (tier === 'CHALLENGER') {
                rankNum += 27
            }

            if (rank === 'V') {
                rankNum += 1;
            }
            else if (rank === 'IV') {
                rankNum += 2;
            }
            else if (rank === 'III') {
                rankNum += 3;
            }
            else if (rank === 'II') {
                rankNum += 4;
            }
            else if (rank === 'I' && (tier !== 'MASTER' || tier !== 'CHALLENGER')) {
                rankNum += 5;
            }
            return callback(rankNum);
        }).catch(err => {
            return callback(0);
        })
    }
}

module.exports = mongoose.model('User', UserSchema);
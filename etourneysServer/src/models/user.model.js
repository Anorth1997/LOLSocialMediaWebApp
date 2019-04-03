const axios = require('axios')
const apiKey = require('../../secret/secret').riotApiKey;
const riotApiConstants = require("../internal-lol-api/constants");

// const lolApiMethods = require('../internal-lol-api/methods');
// const TeamModel = require('./team.model');

const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;



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
        default: undefined,
        validate: {
            validator: (value) => {return emailRegex.test(value)}, 
            message: 'Invalid email'
        }
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
    tournaments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        default: []
    }],
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
    console.log('here')
    console.log(`${riotApiConstants.rootRiotApiLink}/lol/summoner/v4/summoners/by-name/${leagueUsername}?api_key=${apiKey}`)
    return axios.get(`${riotApiConstants.rootRiotApiLink}/lol/summoner/v4/summoners/by-name/${leagueUsername}?api_key=${apiKey}`)
    
}


UserSchema.methods.updatePlayerRank = (leagueUsername) => {
    console.log('in here')
    if (Date.now() - this.lastUpdated < 1000*60) return null;
    else return axios.get(`${riotApiConstants.rootRiotApiLink}/lol/league/v4/positions/by-summoner/${leagueUsername}?api_key=${apiKey}`)    
}

module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');


/**
 * This will create a new tournament
 * 
 * @param {String}  name - Name of the team
 * @param {Array}   players - Array of accountId's
 * @param {ObjectId}   hostId - Id of account that owns team 
 * @param {Object}  privileges - 
 * @param {Number}  totalRank - The total rank of the team (sum of all the ranks)
 * @param {Object}  score - The current score of the team (how many golds, silvers, etc trophies they have) 
 * @param {Number}  dateCreated - Date this team was created
 */
let TeamSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        unique: true
    },
    players: {
        currPlayers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        outgoingPlayerRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        incomingPlayerRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
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
    hostId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    privileges: {
        nothing: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }],
        recruiter: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }],
        admin: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }],
        owner: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }]

    },
    totalRank: {
        type: Number,
        default: 0
    },
    averageRank: {
        type: Number,
        default: 0
    },
    score: {
        gold: {
            type: Number,
            default: 0
        },
        silver: {
            type: Number,
            default: 0
        },
        bronze: {
            type: Number,
            default: 0
        },
        other: {
            type: Number,
            default: 0
        }
    },
    dateCreated: {
        type: Number,
        required: true
    }
}, { versionKey: false})

TeamSchema.pre('save', function(next) {
    if (this.players.length === 0) this.averageRank = 0
    else this.averageRank = Math.floor(this.totalRank / this.players.currPlayers.length)
    next()
});

TeamSchema.pre('update', function(next) {
    if (this.players.length === 0) this.averageRank = 0
    else this.averageRank = Math.floor(this.totalRank / this.players.currPlayers.length)
    next()
})

TeamSchema.methods.playerAuthorizedToRecruit = function(playerId, callback) {
    // console.log('here')
    // console.log(this)
    if (this.privileges.recruiter.find((item) => {
        return item.toString() === playerId
    }) || this.privileges.admin.find((item) => {
        return item.toString() === playerId
    }) || this.privileges.owner.find((item) => {
        return item.toString() === playerId
    })) {
        return callback(true)
    } else {
        return callback(false)
    }
}

TeamSchema.methods.playerAuthorizedToAccept = playerAuthorizedToAccept = (playerId, team, callback) => {
    if (team.privileges.admin.find((item) => {
        return item.toString() === playerId
    }) || team.privileges.owner.find((item) => {
        return item.toString() === playerId
    })) {
        return callback(true)
    } else {
        return callback(false)
    }
}

TeamSchema.plugin(idValidator);


module.exports = mongoose.model('Team', TeamSchema);
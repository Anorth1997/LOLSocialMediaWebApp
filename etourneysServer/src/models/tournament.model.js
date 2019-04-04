const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

/**
 * This will create a new tournament
 * 
 * @param {String}      name - Name of the tournament
 * @param {Array}       participants - Array of participants which contain either teamIds or accountIds (if this.tournamentType = "Single") 
 * @param {String}      hostType - Type of host. Value must be one of ["Personal", "Organization"]
 * @param {String}      hostName - Name of host
 * @param {ObjectId}    hostId - AccountId of host
 * @param {String}      tournamentType - The type of tournament. Value must be one of ["Team", "Single"]
 * @param {Number}      amountOfTeams - The amount of participants in the tournament 
 * @param {ObjectId}    bracketId - The bracketId of the tournament
 * @param {Number}      dateCreated - When the tournament was created
 * @param {Number}      dateStarted - When the tournament will start
 * @param {Number}      dateFinished - When the tournament finished 
 */
let TournamentSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    
    participants: {
        currParticipants:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        incomingParticipants:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        outGoingParticipants:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    
    eliminated: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    hostType: {
        type: String,
        enum: ["Organization", "Personal"], 
        required: true
    },
    hostName: {
        type: String,
        required: true,
        unique: true
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tournamentType: {
        type: String,
        enum: ["Team", "Single"], //this will be something like 1v1s, 3v3s, 5v5s, etc
        required: true
    },
    amountOfTeams: {
        type: Number,
        required: true,
        min: 2,
        max: 100
    },
    playersPerTeam: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    dateCreated: {
        type: Number,
        required: true
    },
    dateStarting: {
        type: Number,
        required: true,
        validate: {
            validator: date => {
                const timeDelta = date - Date.now(); 
                console.log(`time delta: ${timeDelta}`)
                return timeDelta > 10001 && timeDelta < 2678400000 //31 days
            }, message: "Tournament must start at a minimum in 10 minutes and maximum of 31 days."
        }
    },
    dateFinished: {
        type: Number,
        default: null
    },
    hasStarted: {
        type: Boolean,
        default: false
    }
}, { versionKey: false})
TournamentSchema.pre('save', function(next) {
    this.participants.currParticipants.ref = this.tournamentType === 'Single' ? 'User' : 'Team';
    this.participants.incomingParticipants.ref = this.tournamentType === 'Single' ? 'User' : 'Team';
    this.participants.outGoingParticipants.ref = this.tournamentType === 'Single' ? 'User' : 'Team';
    // console.log(this.participants.currParticipants.ref)
    next();
})
TournamentSchema.plugin(idValidator);

// TournamentSchema.index({name: 1})

module.exports = mongoose.model('Tournament', TournamentSchema);
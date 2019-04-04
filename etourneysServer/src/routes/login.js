// dependencies
const HttpStatus = require('http-status-codes');
const express = require('express');
const bcrypt = require('bcrypt');

// models
let UserModel = require('../models/user.model');

const router = express.Router();


router.put('/login', (req, res) => {

    const { username, password } = req.body;
    if (!username || !password) return res.status(HttpStatus.BAD_REQUEST).json({err: "Must contain username and password"})

    UserModel.findOne({
        username: username
    }, (err, user) => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err: "Error connecting to database"});
        if (!user) return res.status(HttpStatus.NOT_FOUND).json({err: "Username not found in database"})

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err: "Error comparing passwords"});

            if (isMatch) {
                user.isOnline = true;
                user.save()
                .then((doc) => {
                    if (!doc || doc.length === 0) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Error writing the thing into db")
                    return res.status(HttpStatus.OK).json({
                        _id: doc._id,
                        leagueUsername: doc.leagueUsername,
                        friends: doc.friends,
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
                    if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
                })
            } else return res.status(HttpStatus.FORBIDDEN).json({err: "PW wrong"})
        })
    })
    .catch(err => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    })
})

router.put('/logout', (req, res) => {

    const { _id } = req.body;

    if (!_id) return res.status(HttpStatus.BAD_REQUEST).json({err: "Missing info"})

    UserModel.findOneAndUpdate({
        _id
    }, {isOnline: false}, {new: true}, (err, user) => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err: "Failed setting to offline"})
        if (!user) return res.status(HttpStatus.NOT_FOUND).json({err: "Failed to find the user to go offline"})        
    
        return res.status(HttpStatus.OK).json({
            message: "Successfully logged out"
        });
    })
    .catch(err => {
        if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err) 
    })
})

module.exports = router;
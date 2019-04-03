// dependencies
const HttpStatus = require('http-status-codes')
const express = require('express');

// models
let UserModel = require('../models/user.model');

const router = express.Router();

// POST localhost:3001/customer

//get request
// router.get('/user', (req, res) => {

//     if (!req.body.username) {
//         return res.status(HttpStatus.BAD_REQUEST).send('Missing url parameter: username')
//     } else if (!req.body.password) {
//         return res.status(HttpStatus.BAD_REQUEST).send('Missing parameter: password');
//     }   
    
//     UserModel.findOne({
//         username: req.body.username,
//         password: req.body.password
//     })
//     .then((doc) => {
//         res.json(doc)
//     })
//     .catch((err) => {
//         res.status(500).json(err)
//     })
// })

// // update request
// router.put('/user', (req, res) => {

//     if (!req.query.username || !req.body.key) {
//         return res.status(400).send('Missing url parameter: username')
//     }

//     console.log(req.body.username)
//     console.log(req.body.password)
    
//     UserModel.findOneAndUpdate({
//         username: req.query.username
//     }, req.body, {
//         new: true //return newly created object
//     })
//     .then((doc) => {
//         res.json(doc)
//     })
//     .catch((err) => {
//         res.status(500).json(err)
//     })

// })





// //delete
// router.delete('/user', (req, res) => {
//     if (!req.query.username) {
//         return response.status(400).send('Missing url parameter: username')
//     }   
    
//     UserModel.findOneAndRemove({
//         username: req.query.username
//     })
//     .then((doc) => {
//         res.json(doc)
//     })
//     .catch((err) => {
//         res.status(500).json(err)
//     })

// })


module.exports = router;
// let CustomerSchema = new mongoose.Schema({
//     id: String,
//     username: String,
//     password: String,
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     league_username: String,
//     friends: {
//         type: Array,
//         default: []
//     }
// })

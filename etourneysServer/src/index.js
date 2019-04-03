//dependencies
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const httpStatus = require('http-status-codes');
// let bodyParser = require('');

// routers
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const modifyRouter = require('./routes/modify');
const searchRouter = require('./routes/search');

const app = express();

// config db
require('./config/db');

// app.set('trust proxy', true);

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}, ${req.body}, host is: ${req.get('host')}. The IP is: ${req.ip}`)
    next()
})

app.use(registerRouter);
app.use(loginRouter);
app.use(modifyRouter);
app.use(searchRouter);
app.use(express.static('public'));

// handler for 404 not found
app.use((req, res, next) => {
    res.status(httpStatus.NOT_FOUND).send('We think you are lost')
})

// Handler for error 500
app.use((err, req, res, next) => {
    console.error(err.stack)

    res.sendFile(path.join(__dirname, '../public/500.html'))
})

// const PORT = process.env.PORT || 3001;
// const PORT = require('../secret/secret').port;
const PORT = 3543;
app.listen(PORT, () => {
    console.info(`Server is currently running`)
})
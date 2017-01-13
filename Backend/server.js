/*
** BACKEND MAIN
*/

// Dependencies

const express = require('express');

const configExpress = require('./config/express');
const dbConnection = require('./db/connection');

const constants = require('./config/env/constants');

const port = process.env.PORT || constants.SERVER_PORT;

// Connect to DB and setup server

const app = express();
configExpress(app);
dbConnection(constants.DB.URL);

// Start server

app.listen(port);
console.log(`INIT :: Server initialized on port: ${port}`);


module.exports = app;

const express = require("express");

const session = require('express-session');

const app = express();

const path = require("path");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, './client/static')));

app.use(session({secret: 'laksngalkdsng;alsdkngoinalkneglksndgoin23oh3ot8h'}));

app.set("views", path.join(__dirname, "./client/views"));
app.set("view engine", "ejs");

mongoose.Promise = global.Promise;


// the way that we access timestamps is `.createdAt` and `.updatedAt`


require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

var server = app.listen(3316, () => {
	console.log("App listening on port 3316");
});

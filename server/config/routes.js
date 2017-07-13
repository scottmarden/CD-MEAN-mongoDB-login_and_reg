const mongoose = require('mongoose');

const User = mongoose.model('User');

const controller = require('./../controllers/controller.js');

module.exports = app => {
	app.get('/', controller.index);
	app.post('/register', controller.register);
	app.post('/login', controller.login);
	app.get('/success', controller.success);
	app.post('/logout', controller.logout);
}

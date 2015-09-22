var mongoose = require('mongoose');
var supertest = require('supertest-as-promised');
var app = require('../../server/app');
require('../../server/db/models');
var AuthUser = mongoose.model('AuthUser');

var userObj = {
			firstName: 'John',
			lastName: 'Smiwth',
			email: 'email@email.com',
			password: 'pwd',
			roles: ['seller', 'admin']
};

module.exports.get = function (roles) {
	var loggedInAgent;
	userObj.roles = roles || [];
	return AuthUser.create(userObj)
	.then(function (createdUser) {
		loggedInAgent = supertest.agent(app);
		return loggedInAgent.post('/login').send(userObj);
	})
	.then(function () {
		return loggedInAgent;
	})
	.then(null, function (error) {
		console.error("Error creating logged in user:", error);
	});
};



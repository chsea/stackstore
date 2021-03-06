// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var AuthUser = mongoose.model('AuthUser');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Users Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	var guestAgent;
	var user1;

	beforeEach('Create guest agent', function () {
		guestAgent = supertest.agent(app);
	});

	beforeEach('Create users', function (done) {
		guestAgent = supertest.agent(app);
		User.create({
			email: 'testing@fsa.com',
			password: 'password',
			firstName: 'Tim',
			lastName: 'Othy',
		}).then(function(user){
			user1 = user;
			return User.create({
				email: 'testing2@fsa.com',
				password: 'password2',
				firstName: 'John',
				lastName: 'Smith'
			});
		}).then(function(){
			done();
		})
		.then(null, done);
	});

	describe('Get', function () {
		it('should get a 200 response', function (done) {
			guestAgent.get('/api/users')
				.expect(200)
				.end(done);
		});

		it('should get all users', function (done) {
			guestAgent.get('/api/users')
				.end(function(err, res){
					if(err) done(err);
					expect(res.body.length).to.equal(2);
					done();
				});
		});

		it('can get by id through queries', function (done) {
			guestAgent.get('/api/users?_id=' + user1._id)
				.end(function(err, res){
					if(err) done(err);
					expect(res.body.length).to.equal(1);
					done();
				});
		});
	});

	describe('Post', function () {
		it('should get a 201 response', function (done) {
			guestAgent.post('/api/users')
				.send({
					email: 'testing3@fsa.com',
					password: 'password3',
					firstName: 'Daniel',
					lastName: 'Perrelly'
				})
				.expect(201)
				.end(done);
		});

		it('should create a new user', function (done) {
			guestAgent.post('/api/users')
				.send({
					email: 'testing3@fsa.com',
					password: 'password3',
					firstName: 'Daniel',
					lastName: 'M'
				})
				.end(function(err, res){
					guestAgent.get('/api/users?_id=' + res.body._id)
						.end(function(err, res){
							if(err) done(err);
							expect(res.body[0].email).to.equal('testing3@fsa.com');
							done();
						});
				});
		});
	});

	describe('Put only for admins', function () {
		it('should get a 200 response', function (done) {
			guestAgent.put('/api/users/' + user1._id)
				.expect(403)
				.end(done);
		});

	});

	describe('Delete only for admins', function () {

		it('should get a 403 response', function (done) {
			guestAgent.delete('/api/users/' + user1._id)
				.expect(403)
				.end(done);
		});

	});

});
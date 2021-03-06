// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Venue = mongoose.model('Venue');
var AuthUser = mongoose.model('AuthUser');
var loggedInUserAgent = require('../../helper/loggedInUserAgent');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

var msgID;
var MSG;
var rrtID;
var RRT;

var WH = {
  name: 'Webster Hall',
  address: {
	streetAddress: 'somewhere in the East Village',
	city: 'New York',
	state: 'NY',
	zip: 10003
  }
};

describe('Venues Route', function () {

	before(function () {
		process.env.TEST = true;
	});

	after(function () {
		process.env.TEST = false;
	});

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	beforeEach('Seed test database',function (done){
		MSG = {
			name: 'Madison Square Garden',
			address: {
				streetAddress: 'somewhere along 7th Ave and 32nd St.',
				city: 'New York',
				state: 'NY',
				zip: 10001
			}
		};
		RRT = {
			name: 'Richard Rodgers Theatre',
			address: {
				streetAddress: 'somewhere in the Theater District',
				city: 'New York',
				state: 'NY',
				zip: 10036
			}
		};
		Venue.create([MSG, RRT])
			.then(function(created){
				msgID=created[0]._id;
				rrtID=created[1]._id;
				done();
			});
	});


	var loggedInAgent;

	beforeEach('Create loggedIn user agent and authenticate', function () {
		return loggedInUserAgent.get(['seller', 'admin'])
		.then(function (userAgent) {
			loggedInAgent = userAgent;
		});
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('POST /api/venues', function () {

		it('should get a 201 response and return the created venue', function (done) {
			loggedInAgent
				.post('/api/venues')
				.send(WH)
				.expect(201)
				.expect(function(res) {
					expect( res.body.name ).to.equal( WH.name );
				})
				.end(done);
		});

	});

	describe('GET /api/venues', function () {

		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should get a 200 response with a list of venues', function (done) {
			guestAgent
				.get('/api/venues')
				.expect(200)
				.expect(function(res){
					expect(res.body.length).to.equal(2);
					expect(res.body[0].name).to.equal(MSG.name);
					expect(res.body[1].name).to.equal(RRT.name);
				})
				.end(done);
		});

	});

	describe('GET /api/venues/:id', function () {

		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should get a 200 response with the requested venue', function (done) {
			guestAgent
				.get('/api/venues/'+rrtID)
				.expect(200)
				.expect(function(res){
					expect(res.body.name).to.equal(RRT.name);
				})
				.end(done);
		});

		it('should get a 404 response with the requested venue', function (done) {
			guestAgent
				.get('/api/venues/nonexistentvenueID')
				.end(function (response, error) {
					expect(error.status).to.equal(404);
					done();
				});
		});

	});

	describe('PUT /api/venues', function () {

		it('should modify an existing venue', function (done) {
			loggedInAgent
				.put('/api/venues/'+msgID)
				.send({name: 'THE GARDEN'})
				.expect(200)
				.end(done);
		});

		it('should return the modified venue', function (done) {
			loggedInAgent
				.put('/api/venues/'+msgID)
				.send({name: 'THE GARDEN'})
				.expect(200)
				.expect(function(res){
					expect(res.body.name).to.equal('THE GARDEN');
				})
				.end(done);
		});

		it('should error if you attempt to modify a nonexistent venue', function (done) {
			loggedInAgent
				.put('/api/venues/nonexistentvenueID')
				.send({name: 'THE GARDEN'})
				.end(function (response, error) {
					expect(error.status).to.equal(404);
					done();
				});
		});

	});

});

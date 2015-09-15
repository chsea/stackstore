// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Venue = mongoose.model('Venue');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Venues Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Post /api/venues', function () {

		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		var newVenue = {
					name: 'Madison Square Garden',
					streetAddress: 'somewhere along 7th Ave and 32nd St.',
					city: 'New York',
					state: 'NY',
					zip: 10001
				};

		xit('should get a 204 response and return the created venue', function (done) {
			guestAgent
				.post('/api/venues')
				.send(newVenue)
				.expect(204)
				.expect(function(res) {
					expect( res.body.name ).to.equal( newVenue.name );
					// check other properties?
		        })
				.end(done);
		});

	});

});

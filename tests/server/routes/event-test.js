// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Event = mongoose.model('Event');
var EventType = mongoose.model('EventType');
var Venue = mongoose.model('Venue');
var Promise = require("bluebird");
var eventCreator = require('../../helper/eventCreator');
var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Events Route', function () {

  before(function () {
    process.env.TEST = true;
  });

  before(function () {
    process.env.TEST = false;
  });

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	var guestAgent;

	beforeEach('Create guest agent', function () {
		guestAgent = supertest.agent(app);
	});

	describe('Get request', function () {
		it('should get all events', function (done) {
      eventCreator.createEvents(2)
      .then(function (events) {
        guestAgent.get('/api/events')
        .expect(200)
        .end(function(err, res){
          if(err) done(err);
          expect(res.body.length).to.equal(2);
          done();
        });
      });
		});

		it('should get an event by id', function (done) {
      eventCreator.createEvent()
      .then(function (createdEvent) {
        guestAgent.get('/api/events/' + createdEvent._id)
        .end(function(err, res){
            if(err) done(err);
            expect(res.body._id).to.equal(createdEvent._id.toString());
            done();
        });
      });
		});

	});

	it('should create a new event', function (done) {
    eventCreator.createEvent()
    .then(function (createdEvent) {
      guestAgent.post('/api/events')
      .send({Venue: createdEvent.Venue._id, EventType: createdEvent.EventType._id, date: new Date()})
      .expect(201)
      .end(function(err, res) {
        guestAgent.get('/api/events')
        .expect(200)
        .end(function(err, res){
          if(err) done(err);
          expect(res.body.length).to.equal(2);
          done();
        });
      });
    });

	});

  it('should update an event', function (done) {
    eventCreator.createEvent()
    .then(function (createdEvent) {
      var date = new Date(1984, 5, 19);
      guestAgent.put('/api/events/' + createdEvent._id)
      .send({date: date})
      .expect(200)
      .end(function(err, res) {
        guestAgent.get('/api/events/' + createdEvent._id)
        .expect(200)
        .end(function(err, res){
          if(err) done(err);
          expect(res.body.date).to.equal(date.toISOString());
          done();
        });
      });
    });

  });

  it('should delete an event', function (done) {

    eventCreator.createEvent().
    then(function (createdEvent) {
      guestAgent.delete('/api/events/' + createdEvent._id)
      .expect(204)
      .end(function(err, res) {
        guestAgent.get('/api/events')
        .expect(200)
        .end(function(err, res){
          if(err) done(err);
          expect(res.body.length).to.equal(0);
          done();
        });
      });
    });

  });
});

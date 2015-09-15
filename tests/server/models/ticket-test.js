var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var EventProduct = mongoose.model('EventProduct');
var Ticket = mongoose.model('Ticket');
var User = mongoose.model('User');

describe('Ticket model', function () {
  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  var eventId, userId;
  beforeEach('Create an event', function(done) {
    EventProduct
    .create({name: 'BSB at MSG', date: new Date(2205, 11, 19)})
    .then(function(e) {
      eventId = e._id;
      return User.create({firstName: 'Omri', lastName: 'Bernstein', email: 'zeke@zeke.zeke', password: 'groovy'})
    }).then(function(user) {
      userId = user._id;
      done();
    })
  });

  afterEach('Clear test database', function (done) {
      clearDB(done);
  });

  it('should exist', function () {
    expect(Ticket).to.be.a('function');
  });

  describe("statics", function() {
    it('should have a function that finds and updates a document', function(done) {
      Ticket
      .create({eventProduct: eventId, seller: userId})
      .then(function(ticket) {
        return Ticket.findAndUpdate(ticket._id, {seat: 'Row 10'});
      })
      .then(function(ticket) {
        console.log(ticket);
        return Ticket.findById(ticket._id).exec();
      }).then(function(ticket) {
        expect(ticket.seat).to.equal('Row 10');
        done();
      }).then(null, function(err) {
        console.log('Errored with', err);
        done(err);
      });
    });
  });
});

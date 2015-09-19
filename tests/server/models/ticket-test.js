var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var EventProduct = mongoose.model('Event');
var Ticket = mongoose.model('Ticket');
var User = mongoose.model('User');

describe('Ticket model', function () {
  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  var ticket, eventId;
  beforeEach('create user/event/tickets', function(done) {
    var userId;
    User
    .create({firstName: 'Omri', lastName: 'Bernstein', email: 'zeke@zeke.zeke', password: 'groovy', address: {
      street: '123 League Drive',
      city: 'Santa Monica',
      state: 'CA',
      zip: '90012'
    }})
    .then(function(user) {
      userId = user._id;
      return EventProduct.create({name: 'BSB at MSG', date: new Date()});
    }).then(function(e) {
      eventId = e._id;
      return Ticket.create([{eventProduct: e._id, seller: userId}, {eventProduct: e._id, seller: userId, sold: true}]);
    }).then(function(tickets) {
      ticket = tickets[0];
      done();
    }).then(null, function(err) {
      done(err);
    });
  });

  afterEach('Clear test database', function (done) {
      clearDB(done);
  });

  it('should exist', function () {
    expect(Ticket).to.be.a('function');
  });

  describe("statics", function() {
    it('should have a function that finds and updates a document', function(done) {
      Ticket.findAndUpdate(ticket._id, {seat: 'Row 10'})
      .then(function(ticket) {
        return Ticket.findById(ticket._id).exec();
      }).then(function(ticket) {
        expect(ticket.seat).to.equal('Row 10');
        done();
      }).then(null, function(err) {
        console.log('Errored with', err);
        done(err);
      });
    });

    it('should keep the correct inventory', function(done) {
      Ticket.inventory(eventId).then(function(count) {
        expect(count).to.equal(1);
        done();
      }).then(null, function(err) {
        done(err);
      });
    });

    it('should keep the correct tickets sold', function(done) {
      Ticket.soldTickets(eventId).then(function(count) {
        expect(count).to.equal(1);
        done();
      }).then(null, function(err) {
        done(err);
      });
    });
  });
});

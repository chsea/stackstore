var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var EventType = mongoose.model('EventType');
var Event = mongoose.model('Event');
var Venue = mongoose.model('Venue');
var Ticket = mongoose.model('Ticket');
var User = mongoose.model('User');

var testEvent;
var testVenue;
describe('Event model', function() {

    beforeEach('Establish DB connection', function(done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function(done) {
        clearDB(done);
    });

    it('should exist', function() {
        expect(Event).to.be.a('function');
    });

    describe("creation", function() {

      beforeEach('Establish test EventType and Venue', function(done){
        EventType.create({
                name: 'Backstreet Boys'
            })
            .then(function(created) {
                testEvent = created;
                return Venue.create({
                    name: 'Madison Square Garden',
                    address: {
                      streetAddress: '4 Pennsylvania Plaza',
                      city: 'New York',
                      state: 'NY',
                      zip: 10001
                    },
                    coordinates: [40.7505045, -73.9934387],
                    seatingMapUrl: '/images/madisonSqGardenSeatMap.png'
                });
            })
            .then(function(created){testVenue=created; done(); })
            .then(null, done);
      });

        var getReqFieldTests = function (reqField) {
          var testObjs = {
            "EventType": {date: new Date(), Venue: testVenue._id},
            "date": {EventType: testEvent._id, Venue: testVenue._id},
            "Venue": {EventType: testEvent._id, date: new Date()}
          };
          return testObjs[reqField];
        };

        var eventRequiredFieldsTests = ['EventType', 'date', 'Venue'];

        eventRequiredFieldsTests.forEach(function(reqField) {
            it("should require " + reqField, function(done) {
                Event.create( getReqFieldTests(reqField) )
                    .then(function() {
                        done(new Error("Event should require a " + reqField + "."));
                    })
                    .then(null, function(err) {
                        try {
                            expect(err.errors.hasOwnProperty(reqField)).to.equal(true);
                            expect(err.errors[reqField].name).to.equal('ValidatorError');
                            expect(err.errors[reqField].properties.path).to.equal(reqField);
                            expect(err.errors[reqField].properties.type).to.equal('required');
                            done();
                        } catch (e) {
                            console.error("ERROR:", e);
                            done(e);
                        }
                    });
            });
        });
    });

    describe("statics", function() {
      // none yet
    });

    describe("virtuals", function(done) {
        it('should have a property that denotes if the event has expired', function(done) {
            var newDate = new Date(1990, 9, 17);
            EventType.create({
                  name: 'Backstreet Boys'
              })
              .then(function(created) {
                  testEvent = created;
                  return Venue.create({
                      name: 'Madison Square Garden',
                      address: {
                        streetAddress: '4 Pennsylvania Plaza',
                        city: 'New York',
                        state: 'NY',
                        zip: 10001
                      },
                      coordinates: [40.7505045, -73.9934387],
                      seatingMapUrl: '/images/madisonSqGardenSeatMap.png'
                  });
              })
              .then(function(created){
                testVenue=created; 
                return Event.create({EventType: testEvent._id, Venue: testVenue._id, date: new Date(1995, 11, 19)});
              })
              .then(function(e) {
                  expect(e.expired).to.equal(true);
                  done();
              })
              .then(null, done);
        });
    });
});

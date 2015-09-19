var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var EventType = mongoose.model('EventType');
var Ticket = mongoose.model('Ticket');
var User = mongoose.model('User');

describe('Event model', function () {

  beforeEach('Establish DB connection', function (done) {
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
      clearDB(done);
  });

  it('should exist', function () {
      expect(EventType).to.be.a('function');
  });

  describe("creation", function () {

    var eventRequiredFieldsTests = [
      {eventObj: {category: 'Concert'}, reqField: 'name'},
    ];

    eventRequiredFieldsTests.forEach(function (test) {
      it("should require " + test.reqField, function (done) {
        EventType.create(test.eventObj)
        .then(function(){
          done(new Error("Event should require a " + test.reqField + "."));
        })
        .then(null, function(err){
          try {
              expect(err.errors.hasOwnProperty(test.reqField)).to.equal(true);
              expect(err.errors[test.reqField].name).to.equal('ValidatorError');
              expect(err.errors[test.reqField].properties.path).to.equal(test.reqField);
              expect(err.errors[test.reqField].properties.type).to.equal('required');
              done();
          } catch (e) {
              console.error("ERROR:", e);
              done(e);
          }
        });
      });
    });

    it('should save category with the correct default value', function(done) {
      EventType.create({name: 'BSB at MSG'}).then(
          function(e) {
          expect(e.category).to.equal('Other');
          done();
        }, 
        done
      );
    });
  });

  describe("statics", function() {
    //none yet
  });

  describe("virtuals", function(done) {
    // none yet
  });
});

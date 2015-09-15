var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var EventProduct = mongoose.model('EventProduct');
var Ticket = mongoose.model('Ticket');

describe('Ticket model', function () {
  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  var eventId;
  beforeEach('Create an event', function(done) {
    EventProduct
    .create({name: 'BSB at MSG', date: new Date(2205, 11, 19)})
    .then(function(e) {
      eventId = e._id;
      done();
    })
  });

  afterEach('Clear test database', function (done) {
      clearDB(done);
  });

  it('should exist', function () {
      expect(Ticket).to.be.a('function');
  });

  describe("creation", function () {

    var eventRequiredFieldsTests = [
      {eventObj: {date: new Date(), category: 'Concert'}, reqField: 'name'},
      {eventObj: {name: "BSB at MSG", category: 'Concert'}, reqField: "date"}
    ];

    eventRequiredFieldsTests.forEach(function (test) {
        it("should require " + test.reqField, function (done) {
            Ticket.create(test.eventObj)
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
      Ticket.create({name: 'BSB at MSG', date: new Date()}).then(function(e) {
        expect(e.category).to.equal('Other');
        done();
      });
    });
  });

  describe("statics", function() {
    it('should have a function that finds and updates a document', function(done) {
      Ticket
      .create({name: 'BSB at MSG', date: new Date()})
      .then(function(e) {
        return EventProduct.findAndUpdate(e._id, {name: 'KaChing Gallery Opening'});
      })
      .then(function(e) {
        return EventProduct.findById(e._id).exec();
      }).then(function(e) {
        expect(e.name).to.equal('KaChing Gallery Opening');
        done();
      }).then(null, function(err) {
        console.log('Errored with', err);
        done(err);
      });
    });
  });
});

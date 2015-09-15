var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models');

var User = mongoose.model('User'),
    Transaction = mongoose.model('Transaction'),
    Ticket = mongoose.model('Ticket'),
    Product = mongoose.model('EventProduct');


describe('Transaction model', function () {

    before('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });


    describe("creation", function () {


        var user, ticket;
        beforeEach(function (done) {
            var userObj = {
                email: 'obama@gmail.com',
                password: 'potus',
                firstName: 'John',
                lastName: 'Smith'
            };
            User.create(userObj)
            .then(function (newUser) {
                user = newUser;
                var productObj = {
                    name: 'SomeProduct',
                    date: new Date(),
                    category: 'Other'
                };
                return Product.create(productObj);
            })
            .then(function (newProduct) {
                var ticketObj = {
                    eventProduct: newProduct._id,
                    seller: user._id
                };
                return Ticket.create(ticketObj);
            })
            .then(function (newTicket) {
                ticket = newTicket;
                done();
            })
            .then(null, done);
        });

        var getTransObj = function (reqField) {
            var transObjs = {
                'buyer': {seller: user._id, ticket: ticket._id, date: new Date(), quantity: 1},
                'seller': {buyer: user._id, ticket: ticket._id, date: new Date(), quantity: 1},
                'ticket': {seller: user._id, buyer: user._id, date: new Date(), quantity: 1},
                'quantity': {seller: user._id, buyer: user._id, ticket: ticket._id, date: new Date()}
            };
            return transObjs[reqField];
        };

        var transactionRequiredFieldsTests = ['buyer', 'seller', 'ticket', 'quantity'];

        transactionRequiredFieldsTests.forEach(function (reqField) {
            it("should require " + reqField, function (done) {
                Transaction.create(getTransObj(reqField))
                .then(function(){
                    done(new Error("Transaction should require a " + reqField + "."));
                })
                .then(null, function(err){
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

});

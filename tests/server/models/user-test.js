var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var User = mongoose.model('User');

describe('User model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(User).to.be.a('function');
    });

    describe('password encryption', function () {

        describe('generateSalt method', function () {

            it('should exist', function () {
                expect(User.generateSalt).to.be.a('function');
            });

            it('should return a random string basically', function () {
                expect(User.generateSalt()).to.be.a('string');
            });

        });

        describe('encryptPassword', function () {

            var cryptoStub;
            var hashUpdateSpy;
            var hashDigestStub;
            beforeEach(function () {

                cryptoStub = sinon.stub(require('crypto'), 'createHash');

                hashUpdateSpy = sinon.spy();
                hashDigestStub = sinon.stub();

                cryptoStub.returns({
                    update: hashUpdateSpy,
                    digest: hashDigestStub
                });

            });

            afterEach(function () {
                cryptoStub.restore();
            });

            it('should exist', function () {
                expect(User.encryptPassword).to.be.a('function');
            });

            it('should call crypto.createHash with "sha1"', function () {
                User.encryptPassword('asldkjf', 'asd08uf2j');
                expect(cryptoStub.calledWith('sha1')).to.be.ok;
            });

            it('should call hash.update with the first and second argument', function () {

                var pass = 'testing';
                var salt = '1093jf10j23ej===12j';

                User.encryptPassword(pass, salt);

                expect(hashUpdateSpy.getCall(0).args[0]).to.be.equal(pass);
                expect(hashUpdateSpy.getCall(1).args[0]).to.be.equal(salt);

            });

            it('should call hash.digest with hex and return the result', function () {

                var x = {};
                hashDigestStub.returns(x);

                var e = User.encryptPassword('sdlkfj', 'asldkjflksf');

                expect(hashDigestStub.calledWith('hex')).to.be.ok;
                expect(e).to.be.equal(x);

            });

        });

        describe('on creation', function () {

            var encryptSpy;
            var saltSpy;

            var createUser = function () {
                return User.create({ email: 'obama@gmail.com', password: 'potus', firstName: 'John', lastName: 'Smith' });
            };

            beforeEach(function () {
                encryptSpy = sinon.spy(User, 'encryptPassword');
                saltSpy = sinon.spy(User, 'generateSalt');
            });

            afterEach(function () {
                encryptSpy.restore();
                saltSpy.restore();
            });




            it('should call User.encryptPassword with the given password and generated salt', function (done) {
                createUser().then(function () {
                    var generatedSalt = saltSpy.getCall(0).returnValue;
                    expect(encryptSpy.calledWith('potus', generatedSalt)).to.be.ok;
                    done();
                });
            });

            it('should set user.salt to the generated salt', function (done) {
               createUser().then(function (user) {
                   var generatedSalt = saltSpy.getCall(0).returnValue;
                   expect(user.salt).to.be.equal(generatedSalt);
                   done();
               });
            });

            it('should set user.password to the encrypted password', function (done) {
                createUser().then(function (user) {
                    var createdPassword = encryptSpy.getCall(0).returnValue;
                    expect(user.password).to.be.equal(createdPassword);
                    done();
                });
            });

        });

    });


    describe("creation", function () {

        it("shouldn't allow user with same email address", function (done) {
            var duplicateEmail = "duplicate@email.com",
                userObj1 = {email: duplicateEmail, password: 'otus', firstName: 'Don', lastName: 'Joe' },
                userObj2 = {email: duplicateEmail, password: 'secret', firstName: 'John', lastName: 'Smith' };
            User.create(userObj1)
            .then(function () {
                return User.create(userObj2);
            })
            .then(function () {
                done(new Error("shouldn't allow to save user with already used email address"));
            })
            .then(null, function (error) {
                try {
                    expect(error.message).to.contain("duplicate key error");
                    done();
                } catch (e) {
                    done(e);
                }
            });

        });

        it("should allow user with valid email address", function () {
            return User.create({ email: "valid@email.com", password: 'potus', firstName: 'John', lastName: 'Smith' })
            .then(function (user) {
                return user.save();
            });
        });

        var invalidEmailAddresses = [
            "123",
            "test@com",
            "test@something..com",
            "test@something.",
            "test@@something.com",
            "@something.com"
        ];

        invalidEmailAddresses.forEach(function (invalidEmail) {
            var userObj = { email: invalidEmail, password: 'potus', firstName: 'John', lastName: 'Smith' };
            it("should reject invalid email address " + invalidEmail, function (done) {
                User.create(userObj)
                .then(function (savedUser) {
                    done(new Error("Invalid email address should throw validation error"));
                })
                .then(null, function (error) {
                    expect(error.errors.hasOwnProperty("email")).to.equal(true);
                    expect(error.errors.email.properties.message).to.equal("Invalid Email Address");
                    done();
                });
            });
        });


        var userRequiredFieldsTests = [
            {userObj: {password: "secret", firstName: 'John', lastName: 'Smith'}, reqField: "email"},
            {userObj: {email: "som@thing.com", firstName: 'John', lastName: 'Smith'}, reqField: "password"},
            {userObj: {email: "som@thing.com", password: "secret", lastName: 'Smith'}, reqField: "firstName"},
            {userObj: {email: "som@thing.com", password: "secret", firstName: 'John'}, reqField: "lastName"}
        ];

        userRequiredFieldsTests.forEach(function (test) {
            it("should require " + test.reqField, function (done) {
                User.create(test.userObj)
                .then(function(){
                    done(new Error("User should require a " + test.reqField + "."));
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
    });

});

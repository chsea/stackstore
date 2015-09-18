'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var User = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  address: {
    street: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: Number, required: true}
  }
}, {collection: 'users', discriminatorKey: 'type'});

var authUser = User.extend({
  password: {type: String, required: true},
  salt: String,
  roles: [String],
  twitter: {id: String, username: String, token: String, tokenSecret: String},
  facebook: {id: String},
  google: {id: String}
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

authUser.pre('save', function(next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    if(!this.roles.length) this.roles = ['buyer'];

    next();

});

authUser.path("email").validate(function(email) {
    return (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(email);
}, "Invalid Email Address");

authUser.pre('save', function (next) {
    if (this.password === undefined &&
        !this.google.id && !this.facebook.id && !this.twitter.id) {
        var valError = new mongoose.Error.ValidationError(this);
        valError.errors.password = {
            name: 'ValidatorError'
        };
        next(valError);
    }
    next();
});

authUser.statics.generateSalt = generateSalt;
authUser.statics.encryptPassword = encryptPassword;

authUser.method('correctPassword', function(candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', User);
mongoose.model('AuthUser', authUser);

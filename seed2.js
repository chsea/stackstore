var mongoose = require('mongoose');
var models = require('./server/db/');
var User = mongoose.model('User');
var AuthUser = mongoose.model('AuthUser');
var EventProduct = mongoose.model('EventProduct');
var Ticket = mongoose.model('Ticket');
var _ = require('lodash');

User.findById('55fc382a583a679929432cbe').then(function(user) {
  user.roles.push('admin');
  user.save().then(function(user) {
    console.log('saved');
  });
});

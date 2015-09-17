var mongoose = require('mongoose');
var models = require('./server/db/');
var User = mongoose.model('User');
var AuthUser = mongoose.model('AuthUser');
var EventProduct = mongoose.model('EventProduct');
var Ticket = mongoose.model('Ticket');
var _ = require('lodash');

var users = [{
  firstName: 'Sam',
  lastName: 'Hartman',
  email: 'kobe@riot.com',
  address: {
    street: '123 League Drive',
    city: 'Santa Monica',
    State: 'CA',
    zip: '90012'
  }
}, {
  firstName: 'Josh',
  lastName: 'Leesman',
  email: 'jatt@riot.com',
  address: {
    street: '123 League Drive',
    city: 'Santa Monica',
    State: 'CA',
    zip: '90012'
  }
}];

var aUser = {
  firstName: 'Sea',
  lastName: 'Song',
  email: 'yay@riot.com',
  address: {
    street: '123 League Drive',
    city: 'Santa Monica',
    State: 'CA',
    zip: '90012'
  }
};

User.create(users).then(function(users) {
  console.log(users.length, ' created!');
});
AuthUser.create(aUser).then(function(user){
  console.log(user.firstName, ' created');
});

// EventProduct
// .create({name: 'BSB2 at MSG', date: new Date(2019, 11, 19)})
// .then(function(event) {
//   return Ticket.create({buyer: '55f9bfd58027a45b111b1a82', seller: '55f9bfd58027a45b111b1a82', eventProduct: event._id});
// }).then(function(ticket) {
//   console.log('ticket', ticket);
// });

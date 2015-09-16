var mongoose = require('mongoose');
var models = require('./server/db/')
var EventProduct = mongoose.model('EventProduct');
var Ticket = mongoose.model('Ticket');

EventProduct
.create({name: 'BSB2 at MSG', date: new Date(2019, 11, 19)})
.then(function(event) {
  return Ticket.create({buyer: '55f9bfd58027a45b111b1a82', seller: '55f9bfd58027a45b111b1a82', eventProduct: event._id});
}).then(function(ticket) {
  console.log('ticket', ticket);
});

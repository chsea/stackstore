'use strict';
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    eventProduct: { type: String, ref: 'EventProduct', required: true},
    seller: {type: String, ref:'User', required: true},
    buyer: {type: String, ref:'User'},
    price: {type: Number, required: true, default: 0.01}, //min $0.01
    seat: {type: String, required: true, default: 'General Admission'},
    sold: {type: Boolean, required: true, default: false} // if sold, obvs not avail anymore
});

schema.statics.findAndUpdate = function (id, changes) {
	return this.findById(id).then(function(ticket) {
  	Object.keys(changes).forEach(function(key){
  		ticket[key] = changes[key];
  	});
    return ticket.save();
  });
};

schema.statics.inventory = function(eventId) {
  return this.count({eventProduct: eventId, sold: false}).exec();
};

schema.statics.soldTickets = function(eventId) {
  return this.count({eventProduct: eventId, sold: true}).exec();
};

schema.plugin(deepPopulate);

mongoose.model('Ticket', schema);

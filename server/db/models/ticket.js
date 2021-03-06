'use strict';
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    eventProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
    seller: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    buyer: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    price: {type: Number, required: true, default: 0.01}, //min $0.01
    seat: {type: String, required: true, default: 'General Admission'},
    dateSelling: {type: Date, required: true},
    dateSold: {type: Date}, // if sold, obvs not avail anymore
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
  return this.count({eventProduct: eventId, dateSold: { $exists: false }}).exec();
};

schema.statics.soldTickets = function(eventId) {
  return this.count({eventProduct: eventId, dateSold: { $exists: true }}).exec();
};

schema.plugin(deepPopulate);

mongoose.model('Ticket', schema);

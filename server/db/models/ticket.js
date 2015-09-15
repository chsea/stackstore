'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    eventProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'EventProduct', required: true},
    seller: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    price: {type: Number, required: true, default: 0.01}, //min $0.01
    seat: {type: String, required: true, default: 'General Admission'},
    sold: {type: Boolean, required: true, default: false} // if sold, obvs not avail anymore
});

schema.statics.findAndUpdate = function (old, changes) {
	Object.keys(changes).forEach(function(key){
		old[key] = changes[key];
	});
	return old.save();
};

mongoose.model('Ticket', schema);

'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    streetAddress: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: Number, required: true},
    category: {type: String, required: true, default: 'Other'}, // stadium vs. art gallery etc.
    seatingMapUrl: {type: String}
});

schema.statics.findAndUpdate = function (old, changes) {
	Object.keys(changes).forEach(function(key){
		old[key] = changes[key];
	});
	return old.save();
};

mongoose.model('Venue', schema);
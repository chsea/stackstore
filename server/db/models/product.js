'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    category: {type: String, required: true, default: 'Other'},
    venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue'},
});

schema.statics.findAndUpdate = function (id, changes) {
	return this.findById(id).then(function(eventProduct) {
  	Object.keys(changes).forEach(function(key){
  		eventProduct[key] = changes[key];
  	});
    return eventProduct.save();
  });
};

schema.virtual('expired').get(function () {
  return new Date() > this.date;
});

mongoose.model('EventProduct', schema);

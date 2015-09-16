'use strict';
var mongoose = require('mongoose');
var shortid = require('shortid');

var schema = new mongoose.Schema({
    _id: {type: String, required: true, unique: true, default: shortid.generate}, 
    name: {type: String, required: true},
    date: {type: Date, required: true},
    category: {type: String, required: true, default: 'Other'},
    venue: { type: String, ref: 'Venue'},
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

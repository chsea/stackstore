'use strict';
var mongoose = require('mongoose');
var shortid = require('shortid');

var schema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId}, 
    name: {type: String, required: true},
    imgUrl: {type: String, default: '/images/defaultEvent.jpg'}, 
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

mongoose.model('EventType', schema);

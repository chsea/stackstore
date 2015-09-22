'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    imgUrl: {type: String, default: '/images/defaultEvent.jpg'}, 
    category: {type: String, required: true, default: 'Other'},
    tags: [{type: String}], 
    inactive: {type: Boolean, default: false}
});

schema.pre('save',function (next) {
	if (!this.tags.length) this.tags.push(this.category);
	next();
});

mongoose.model('EventType', schema);

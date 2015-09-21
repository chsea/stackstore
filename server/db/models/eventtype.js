'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    imgUrl: {type: String, default: '/images/defaultEvent.jpg'},
    category: {type: String, required: true, default: 'Other'}
});

// schema.statics.findAndUpdate = function (id, changes) {
// 	return this.findByIdAndUpdate(id,changes,{new: true});
// };

mongoose.model('EventType', schema);

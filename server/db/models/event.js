'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    EventType: { type: mongoose.Schema.Types.ObjectId, ref: 'EventType', required: true},
    date: {type: Date, required: true},
    Venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required:true}
});

schema.statics.findAndUpdate = function (id, changes) {
 return this.findByIdAndUpdate(id,changes,{new: true});
};

schema.virtual('expired').get(function () {
  return new Date() > this.date;
});

mongoose.model('Event', schema);

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var EventType = mongoose.model('EventType');
var _ = require('lodash');
var Promise = require('bluebird');

router.param('eventId',function(req,res,next,eventId){
	Event.findOne({_id: eventId}).populate('EventType').then(
		function(e){
			console.log(e);
			req.eventId = eventId;
			req.tags = e.EventType.tags;
			next();
		},
		function (err) {
			err.status = 404;
			next(err);
		}
	);
});

router.get('/',function(req,res){
	EventType.find().then( results => res.send(results) );
});

router.get('/:eventId',function (req,res) {
	EventType.find({tags: {$in: req.tags} })
		.then(function (results) {
			// transform instances to objects and remove the current event type from the list
			results = results.map(result => result.toObject()).filter(r => r._id!=req.eventId);
			
			// attach a score to each event type
			results.forEach(function (r) {
				r.score = req.tags.filter( tag => r.tags.indexOf(tag)>-1 ).length;
			});
			
			// sort by score, take top three, and keep just their _ids
			var finalArr = _.sortByOrder(results, 'score', 'desc').slice(0,3).map(r => r._id);
			
			// find one actual Event that corresponds to each event type
			return Promise.map(finalArr, function (elem) { 
				return Event.findOne({"EventType":elem}).populate('EventType'); 
			});
		})
		.then( events => res.json(events) );
});

module.exports = router;
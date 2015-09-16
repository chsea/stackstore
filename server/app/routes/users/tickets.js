var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ticket = mongoose.model('Ticket');

router.get('/',function(req,res){
  req.query.seller = req.user._id;
	Ticket.find(req.query).then(function(tickets){
		res.send(tickets);
	});
});

module.exports = router;

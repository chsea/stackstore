app.controller('TicketsForEventCtrl',function ($scope, CartFactory){
	$scope.addToCart = function(id){
		CartFactory.add(id).finally(function(){
			$scope.tickets.forEach(function(ticket){
				if(ticket._id.toString() === id.toString()) ticket.added = true;
			});
		});
	};

	$scope.removeTicket = function(ticketId){
		console.log(ticketId);
		CartFactory.delete(ticketId).then(function(newCart){
			$scope.tickets.forEach(function(ticket){
				if(ticket._id.toString() === ticketId.toString()) ticket.added = false;
			});
		});
	};
});
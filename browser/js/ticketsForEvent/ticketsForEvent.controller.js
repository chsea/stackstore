app.controller('TicketsForEventCtrl',function ($scope, $state, $stateParams, TicketsForEventFactory, CartFactory){
	$scope.addToCart = function(id){
		CartFactory.add(id).finally(function(){
			$scope.tickets.forEach(function(ticket){
				if(ticket._id.toString() === id.toString()) ticket.added = true;
			});
		});
	};
});
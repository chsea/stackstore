app.controller('TicketsForEventCtrl',function ($scope, $state, $stateParams, TicketsForEventFactory, CartFactory){
	TicketsForEventFactory.getAll($stateParams.id).then(function(tickets){
		$scope.tickets = tickets;
	});
	$scope.addToCart = CartFactory.add;
});
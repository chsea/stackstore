app.controller('TicketsForEventCtrl',function($scope, $state, TicketsForEventFactory){
	TicketsForEventFactory.getAll('55f8a7c9e01b0a1f8789f9c9').then(function(tickets){
		$scope.tickets = tickets;
	});
});
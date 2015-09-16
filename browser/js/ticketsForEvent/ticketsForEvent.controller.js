app.controller('TicketsForEventCtrl',function($scope, $state, $stateParams, TicketsForEventFactory){
	TicketsForEventFactory.getAll($stateParams.id).then(function(tickets){
		$scope.tickets = tickets;
	});
});
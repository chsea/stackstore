app.controller('MoreDatesCtrl',function($scope, $state, $stateParams, TicketsForEventFactory){
	TicketsForEventFactory.getAlternateDates($stateParams.id).then(function(dates){
		$scope.dates = dates;
	});
});
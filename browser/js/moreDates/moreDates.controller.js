app.controller('MoreDatesCtrl',function($scope, $state, $stateParams, TicketsForEventFactory){
	TicketsForEventFactory.getAlternateDates($stateParams.id).then(function(dates){
		console.log(dates);
		$scope.dates = dates;
	});
});
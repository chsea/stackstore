app.controller('MoreDatesCtrl',function($scope, $state, $stateParams, TicketsForEventFactory){
	console.log("scope:", $scope);
	TicketsForEventFactory.getAlternateDates($scope.eventData.EventType._id).then(function(dates){
		$scope.dates = dates;
	});
});
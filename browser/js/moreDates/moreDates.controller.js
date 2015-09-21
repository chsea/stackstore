app.controller('MoreDatesCtrl',function($scope, $state, $stateParams, TicketsForEventFactory){
	TicketsForEventFactory.getAlternateDates($scope.eventData.EventType._id).then(function(dates){
		$scope.currentDate = $scope.eventData.date;
		console.log(dates);
		$scope.dates = dates;
	});
});

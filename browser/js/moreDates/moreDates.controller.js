app.controller('MoreDatesCtrl',function($scope, $state, $stateParams, TicketsForEventFactory){
	TicketsForEventFactory.getAlternateDates($scope.eventData.EventType._id).then(function(dates){
		$scope.currentDate = $scope.eventData.date;
		$scope.dates = dates;
	});
});
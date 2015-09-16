app.controller('UpcomingEventsCtrl',function($scope, $state, $stateParams, UpcomingEventsFactory){
	UpcomingEventsFactory.getAll($stateParams.id).then(function(events){
		$scope.events = events;
	});
});
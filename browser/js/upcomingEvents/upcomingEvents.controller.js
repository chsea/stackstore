app.controller('UpcomingEventsCtrl',function($scope, $state, $stateParams, UpcomingEventsFactory){
	UpcomingEventsFactory.getAll($stateParams.id).then(function(events){
		$scope.events = events.filter(e => !e.Venue.inactive && !e.EventType.inactive && new Date() < new Date(e.date));
	});
});

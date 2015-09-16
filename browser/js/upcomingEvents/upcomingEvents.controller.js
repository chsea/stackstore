app.controller('UpcomingEventsCtrl',function($scope, $state, UpcomingEventsFactory){
	UpcomingEventsFactory.getAll('55f8a7c9e01b0a1f8789f9c5').then(function(events){
		$scope.events = events;
	});
});
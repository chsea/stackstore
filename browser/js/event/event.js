app.config(function($stateProvider) {
	$stateProvider.state('event', {
		url: '/event/:id',
		templateUrl: 'js/event/event.html',
		controller: 'EventCtrl',
		resolve: {
			eventData: function($stateParams, Event){
				// GET --> /api/events
				return Event.find($stateParams.id);
			}
		}
	});
	$stateProvider.state('events', {
		url: '/events',
		templateUrl: 'js/event/events.html',
		controller: 'EventCtrl',
		resolve: {
			eventData: function(Event){
				// GET --> /api/events
				return Event.findAll();
			},
			user: function(User, AuthService){
        return AuthService.getLoggedInUser();
      }
		}
	});
});

// app.config(function ($stateProvider) {
//     $stateProvider.state('event', {
//         url: '/event/:id',
//         templateUrl: 'js/event/event.html',
//         controller: 'EventCtrl',
//         resolve: {
//         	eventData: function ($stateParams, EventFactory) {return EventFactory.getOne($stateParams.id); }
//         }
//     });
// });

// JSData version
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
});
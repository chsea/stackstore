// app.config(function ($stateProvider) {
//     $stateProvider.state('venue', {
//         url: '/venue/:id',
//         templateUrl: 'js/venue/venue.html',
//         controller: 'VenueCtrl',
//         resolve: {
//         	venue: function ($stateParams, VenueFactory) { return VenueFactory.getOne($stateParams.id); }
//         }
//     });
// });

// JSData version
app.config(function($stateProvider) {
	$stateProvider.state('venue', {
		url: '/venue/:id',
		templateUrl: 'js/venue/venue.html',
		controller: 'VenueCtrl',
		resolve: {
			venue: function($stateParams, Venue){
				// GET --> /api/venues
				return Venue.find($stateParams.id);
			}
		}
	});
});
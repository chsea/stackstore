// app.factory('EventFactory', function ($http){
// 	function getOne(id) {
// 		return $http.get('/api/events/'+id)
// 			.then(function(resp){return resp.data; });
// 	}

// 	return {
// 		getOne: getOne
// 	};
// });

// JS Data version
app.factory('Event', function(DS, $state) {
	return DS.defineResource({
		name: 'events',
		methods: {
			go: function() {
				$state.go('event', {
					eventId: this._id
				});
			}
		}

	});
}).run(function (Event) {});
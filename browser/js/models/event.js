app.factory('Event', function(DS, $state) {
	return DS.defineResource({
		name: 'events',
		methods: {
			go: function() {
				$state.go('event', {userId: this._id});
			}
		}
	});
}).run(function (Event) {});

app.factory('EventType', function(DS, $state) {
	return DS.defineResource({
		name: 'eventTypes',
		methods: {
			go: function() {
				$state.go('eventType', {
					eventId: this._id
				});
			}
		}
	});
}).run(function (EventType) {});

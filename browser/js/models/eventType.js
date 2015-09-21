app.factory('EventType', function(DS, $state, Event) {
	return DS.defineResource({
		name: 'eventTypes',
		methods: {
			go: function() {
				$state.go('eventType', {userId: this._id});
			},
			expired: function() {
				return Event.findAll({eventType: this._id}).then((events) => {
					events.sort((a, b) => a.date > b.date);
					return new Date() > events[0].date;
				});
			}
		}
	});
}).run(function (EventType) {});

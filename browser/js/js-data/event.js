app.factory('Event', function(DS, $state) {
	return DS.defineResource({
		name: 'events',
		methods: {
			go: function() {
				$state.go('ticket', {
					userId: this._id
				});
			}
		}
	});
}).run(function (Event) {});

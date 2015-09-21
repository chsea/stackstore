app.factory('Event', function(DS, $state) {
	return DS.defineResource({
		name: 'events',
		computed: {
			expired: ['date',
						 (date) => new Date() > new Date(date)]
		},
		methods: {
			go: function() {
				$state.go('event', {userId: this._id});
			}
		}
	});
}).run(function (Event) {});

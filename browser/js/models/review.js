app.factory('Review', function(DS, $state) {
	return DS.defineResource({
		name: 'reviews',
		methods: {
			go: function() {
				$state.go('review', {userId: this._id});
			}
		}
	});
}).run(function (Review) {});

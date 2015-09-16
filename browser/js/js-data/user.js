app.factory('User', function(DS, $state) {
	return DS.defineResource({
		name: 'users',
		methods: {
			go: function() {
				$state.go('user', {
					userId: this._id
				});
			}
		}
	});
}).run(function (User) {});

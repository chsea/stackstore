app.factory('User', function(DS, $state) {
	return DS.defineResource({
		name: 'users',
		computed: {
			name: ['firstName',
						 'lastName',
						 (firstName, lastName) => `${firstName} ${lastName}`],
			addy: ['address',
						 (address) => `${address.street}, ${address.city}, ${address.state} ${address.zip}`]
		},
		methods: {
			go: function() {
				$state.go('user', {
					userId: this._id
				});
			}
		}
	});
}).run(function (User) {});

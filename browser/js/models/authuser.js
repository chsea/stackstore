app.factory('AuthUser', function(DS, $state) {
	return DS.defineResource({
		name: 'authusers',
		methods: {
			go: function() {
				$state.go('user', {userId: this._id});
			}
		},
		computed: {
			isSeller: ['roles',
								 (roles) => roles.indexOf('seller') > -1],
			isAdmin: ['roles',
								(roles) => roles.indexOf('admin') > -1],
			name: ['firstName',
						 'lastName',
						 (firstName, lastName) => `${firstName} ${lastName}`],
			addy: ['address',
						 (address) => address ? `${address.street}, ${address.city}, ${address.state} ${address.zip}` : null]
		}
	});
}).run(function (AuthUser) {});

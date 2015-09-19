app.factory('AuthUser', function(DS, $state) {
	return DS.defineResource({
		name: 'authusers',
		methods: {
			go: function() {
				$state.go('user', {
					userId: this._id
				});
			}
		},
		computed: {
			isSeller: ['roles', function(roles) {
				return roles.indexOf('seller') > -1;
			}],
			isAdmin: ['roles', function(roles) {
				return roles.indexOf('admin') > -1;
			}]
		}
	});
}).run(function (User) {});

app.factory('Ticket', function(DS, $state) {
	return DS.defineResource({
		name: 'tickets',
    relations: {
			belongsTo: {
				events: {
					localKey: 'eventProduct',
					localField: 'eventInfo'
				},
				users: {
					localKey: 'seller',
					localField: 'sellerInfo'
				}
			},
		},
		methods: {
			go: function() {
				$state.go('ticket', {
					userId: this._id
				});
			}
		}
	});
}).run(function (User) {});

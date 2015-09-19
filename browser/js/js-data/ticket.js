app.factory('Ticket', function(DS, $state) {
	return DS.defineResource({
		name: 'tickets',
    relations: {
			belongsTo: {
				events: {
					localKey: 'eventProduct',
					localField: 'event'
				}
			},
		},
		computed: {
			sold: ['buyer', function(buyer) {
				return Boolean(buyer);
			}]
		},
		methods: {
			go: function() {
				$state.go('ticket', {
					userId: this._id
				});
			},
			expired: function() {
				return new Date() > new Date(this.event.date);
			}
		}
	});
})
.run(function (Ticket) {});

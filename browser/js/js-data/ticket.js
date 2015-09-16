app.factory('Ticket', function(DS, $state) {
	return DS.defineResource({
		name: 'tickets',
    relations: {
			belongsTo: {
				events: {
					localKey: 'eventProduct',
					localField: 'eventInfo'
				},
				users: [{
					localKey: 'seller',
					localField: 'sellerInfo'
				},
				{
					localKey: 'buyer',
					localField: 'buyerInfo'
				}]
			},
		},
		methods: {
			go: function() {
				$state.go('ticket', {
					userId: this._id
				});
			},
			expired: function() {
				return new Date() > new Date(this.eventInfo.date);
			}
		}
	});
})
.run(function (Ticket) {});

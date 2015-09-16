app.factory('Transaction', function(DS, $state) {
	return DS.defineResource({
		name: 'transactions',
    relations: {
      belongsTo: {
        // users: {
        //   localKey: 'seller',
        //   localField: 'sellerInfo'
        // },
        users: {
          localKey: 'buyer',
          localField: 'buyerInfo'
        },
        tickets: {
          localKey: 'ticket',
          localField: 'ticketInfo'
        }
      }
    },
		methods: {
			go: function() {
				$state.go('transaction', {
					userId: this._id
				});
			}
		}
	});
}).run(function (Transaction) {});

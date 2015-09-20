// app.factory('VenueFactory', function ($http){
// 	function getOne(id) {
// 		return $http.get('/api/venues/'+id)
// 			.then(function(resp){return resp.data; });
// 	}

// 	return {
// 		getOne: getOne
// 	};
// });

// JS Data version
app.factory('Venue', function(DS, $state) {
  return DS.defineResource({
    name: 'venues',
    computed: {
      addy: ['address', (address) => `${address.streetAddress}, ${address.city}, ${address.state} ${address.zip}`]
    },
    methods: {
      go: function() {
        $state.go('venue', {id: this._id});
      }
    }
  });
}).run(function(Venue) {});

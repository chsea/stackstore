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

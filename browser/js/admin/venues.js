app.config(function($stateProvider) {
  $stateProvider.state('admin.venues', {
    url: '/venues',
    controller: 'AdminVenuesController',
    templateUrl: 'js/admin/venues.html',
    resolve: {
      venues: (Venue) => Venue.findAll()
    }
  });
}).controller('AdminVenuesController', function($scope, $state, DS, venues, Venue) {
  $scope.venues = venues.map((venue) => {
    venue.edit = false;
    return venue;
  });
  $scope.newVenue = {};
  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ');

  $scope.update = (venue) => {
    venue.DSUpdate(venue)
      .then(() => {
        alert('Updated!');
        $state.go('admin.venues', {}, {reload: true});
      });
  };

  $scope.add = () => {
    Venue.create($scope.newVenue)
      .then((venue) => {
        alert(`${venue.name} created!`);
        $state.go('admin.venues', {}, {reload: true});
      });
  };

  $scope.inactivate = (venue) => {
    venue.DSUpdate({inactive: true})
      .then(() => {
        alert('Updated!');
        $state.go('admin.venues', {}, {reload: true});
      });
  };

  $scope.activate = (venue) => {
    venue.DSUpdate({inactive: false})
      .then(() => {
        alert('Updated!');
        $state.go('admin.venues', {}, {reload: true});
      });
  };
});

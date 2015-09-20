app.config(function ($stateProvider) {
  $stateProvider.state('admin.venues', {
      url: '/venues',
      controller: 'AdminVenuesController',
      templateUrl: 'js/admin/venues.html',
      resolve: {
        venues: function(Venue){
          return Venue.findAll();
        }
      }
  });
}).controller('AdminVenuesController', function($scope, $state, DS, venues, Venue) {
  $scope.venues = venues.map((venue) => {
    venue.edit = false;
    return venue;
  });
  $scope.newVenue = {};

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
});

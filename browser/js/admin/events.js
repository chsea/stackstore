app.config(function ($stateProvider) {
  $stateProvider.state('admin.events', {
      url: '/events',
      controller: 'AdminEventsController',
      templateUrl: 'js/admin/events.html',
      resolve: {
        events: function(Event){
          return Event.findAll();
        }
      }
  });
}).controller('AdminEventsController', function($scope, $state, DS, events) {
  $scope.events = events.map((event) => {
    event.edit = false;
    return event;
  });
  $scope.update = (event) => {
    event.DSUpdate({date: event.date, venue: event.venue})
    .then(() => {
      alert('Promoted!');
      $state.go('admin.users', {}, {reload: true});
    });
  };
});

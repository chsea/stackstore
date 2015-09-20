app.config(function($stateProvider) {
  $stateProvider.state('admin.events', {
    url: '/events',
    controller: 'AdminEventsController',
    templateUrl: 'js/admin/events.html',
    resolve: {
      eventTypes: (EventType) => EventType.findAll(),
      venues: (Venue) => Venue.findAll(),
      events: (Event) => Event.findAll()
    }
  });
}).controller('AdminEventsController', function($scope, $state, DS, events, venues, eventTypes, Event) {
  $scope.events = events.map((event) => {
    event.edit = false;
    return event;
  });

  $scope.newEvent = {};
  $scope.eventTypes = eventTypes;
  $scope.venues = venues;

  $scope.update = (event) => {
    event.Venue = event.Venue._id;
    event.DSUpdate(event)
    .then(() => {
      alert('Event updated!');
      $state.go('admin.events', {}, {reload: true});
    });
  };

  $scope.add = () => {
    Event.create($scope.newEvent)
      .then(() => {
        alert(`Event created!`);
        $state.go('admin.events', {}, {reload: true});
      });
  };
});

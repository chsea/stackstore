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
  $scope.events = events.map((e) => {
    e.edit = false;
    return e;
  });

  $scope.newEvent = {};
  $scope.eventTypes = eventTypes.filter((eventType) => !eventType.inactive);
  $scope.venues = venues.filter((venue) => !venue.inactive);

  $scope.update = (e) => {
    e.Venue = e.Venue._id;
    e.DSUpdate(e)
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

  $scope.inactivate = (e) => {
    e.DSUpdate({inactive: true})
      .then(() => {
        alert('Updated!');
        $state.go('admin.es', {}, {reload: true});
      });
  };

  $scope.activate = (e) => {
    e.DSUpdate({inactive: false})
      .then(() => {
        alert('Updated!');
        $state.go('admin.venues', {}, {reload: true});
      });
  };
});

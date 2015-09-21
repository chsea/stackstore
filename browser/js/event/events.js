app.config(function($stateProvider) {
  $stateProvider.state('events', {
    url: '/events',
    templateUrl: 'js/event/events.html',
    controller: 'EventsCtrl',
    resolve: {
      user: (AuthService) => AuthService.getLoggedInUser(),
      events: (Event) => Event.findAll(),
      tickets: (Ticket) => Ticket.findAll()
    }
  });
}).controller('EventsCtrl', function($scope, Event, events, tickets) {
  $scope.eventData = events;
  $scope.tickets = tickets;
  $scope.refreshEventData = function(category) {
    Event.findAll()
      .then(function(newData) {
        if (!category) return newData;
        return newData.filter(e => e.EventType.category == category);
      })
      .then(function(filtered) {
        $scope.eventData = filtered;
      });
  };
});

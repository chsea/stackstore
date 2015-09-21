app.config(function($stateProvider) {
  $stateProvider.state('events.event', {
    url: '/:id',
    templateUrl: 'js/event/event.html',
    controller: 'EventCtrl',
    resolve: {
      user: (AuthService) => AuthService.getLoggedInUser(),
      event: (Event, $stateParams) => Event.find($stateParams.id),
      reviews: (Review) => Review.findAll()
    }
  });
}).controller('EventCtrl', function($scope, user, event, tickets, reviews) {
  $scope.eventData = event;
  $scope.tickets = tickets;
  $scope.reviews = reviews;

  $scope.loggedIn = Boolean(user);
  $scope.showAddForm = false;
});

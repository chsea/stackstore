app.config(function($stateProvider) {
  $stateProvider.state('event', {
    url: '/event/:id',
    templateUrl: 'js/event/event.html',
    controller: 'EventCtrl',
    resolve: {
      tickets: (Ticket, $stateParams) => Ticket.findAll({eventProduct: $stateParams.id}),
      user: (AuthService) => AuthService.getLoggedInUser(),
      currentEvent: (Event, $stateParams) => Event.find($stateParams.id),
      reviews: (Review, currentEvent) => Review.findAll({eventType: currentEvent.EventType._id})
    }
  });
}).controller('EventCtrl', function($scope, $state, user, currentEvent, tickets, reviews, Review) {
  $scope.eventData = currentEvent;
  $scope.tickets = tickets.filter(function(ticket){
      return !ticket.buyer;
  });
  $scope.reviews = reviews;

  $scope.loggedIn = Boolean(user);
  $scope.stars = [1, 2, 3, 4, 5];
  $scope.newReview = {};

  $scope.addReview = () => {
    $scope.newReview.reviewer = user._id;
    $scope.newReview.eventType = currentEvent.EventType;
    Review.create($scope.newReview).then(() => {
      alert('Review created!');
      $state.go('event', {id: currentEvent._id}, {reload: true});
    });
  };
});

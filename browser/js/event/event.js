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
}).controller('EventCtrl', function($scope, $state, user, event, tickets, reviews, Review) {
  $scope.eventData = event;
  $scope.tickets = tickets;
  $scope.reviews = reviews;
  console.log(reviews);

  $scope.loggedIn = Boolean(user);
  $scope.stars = [1, 2, 3, 4, 5];
  $scope.newReview = {};

  $scope.addReview = () => {
    $scope.newReview.reviewer = user._id;
    $scope.newReview.eventType = event.EventType;
    Review.create($scope.newReview).then(() => {
      alert('Review created!');
      $state.go('events.event', {id: event._id}, {reload: true});
    });
  };
});

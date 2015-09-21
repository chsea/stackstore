app.config(function($stateProvider) {
  $stateProvider.state('profile', {
    url: '/profile',
    templateUrl: 'js/profile/profile.html',
    controller: 'UserController',
    resolve: {
      user: (AuthUser, AuthService) => {
        return AuthService.getLoggedInUser()
               .then((user) => AuthUser.find(user._id));
      },
      events: (Event) => Event.findAll(),
      ticketsSelling: (Ticket, events, user) => Ticket.findAll({seller: user._id}),
      ticketsBought: (Ticket, events, user) => Ticket.findAll({buyer: user._id})
    },
    data: {
      authenticate: true
    }
  });
});

app.controller('UserController', function($scope, user) {
  $scope.user = user;
});

app.config(function($stateProvider) {
  $stateProvider.state('profile', {
    url: '/profile',
    templateUrl: 'js/profile/profile.html',
    controller: 'UserController',
    resolve: {
      user: function(AuthUser, AuthService) {
        return AuthService.getLoggedInUser().then(function(user) {
          return AuthUser.find(user._id);
        });
      }
    }
  });
});

app.controller('UserController', function($scope, user) {
  $scope.user = user;
});

app.config(function ($stateProvider) {
  $stateProvider.state('profile', {
    url: '/profile',
    templateUrl: 'js/user/profile.html',
    controller: 'UserController',
    resolve: {
      user: function(User, AuthService){
        return AuthService.getLoggedInUser().then(function(user){
          return User.find(user._id);
        });
      }
    }
  });
});

app.controller('UserController', function($scope, user) {
	$scope.user = user;
});

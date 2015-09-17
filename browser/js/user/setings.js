app.config(function ($stateProvider) {
  $stateProvider.state('profile.settings', {
    url: '/settings',
    templateUrl: 'js/user/settings.html',
    controller: 'SettingsController',
    resolve: {
      user: function(User, AuthService){
        return AuthService.getLoggedInUser().then(function(user){
          return User.find(user._id);
        });
      }
    }
  });
});

app.controller('SettingsController', function($scope, user, User) {
	$scope.user = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };

  $scope.newPassword = '';

  $scope.submitForm = function() {
    if ($scope.newPassword) $scope.user.password = newPassword;
    User.update(user._id, $scope.user).then(function() {
      alert('Settings updated!');
      $state.go('profile.settings', {}, {reload: true});
    });
  };
});

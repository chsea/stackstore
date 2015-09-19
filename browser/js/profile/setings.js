app.config(function ($stateProvider) {
  $stateProvider.state('profile.settings', {
    url: '/settings',
    templateUrl: 'js/profile/settings.html',
    controller: 'SettingsController',
    resolve: {
      user: function(AuthUser, AuthService){
        return AuthService.getLoggedInUser().then(function(user){
          return AuthUser.find(user._id);
        });
      }
    }
  });
});

app.controller('SettingsController', function($scope, user, User) {
	$scope.user = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.address
  };

  $scope.newPassword = '';

  $scope.isSeller = user.isSeller;

  $scope.submitForm = function() {
    if ($scope.newPassword) $scope.user.password = newPassword;
    User.update(user._id, $scope.user).then(function() {
      alert('Settings updated!');
      $state.go('profile.settings', {}, {reload: true});
    });
  };
});

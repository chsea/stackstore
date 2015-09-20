app.config(function($stateProvider) {
  $stateProvider.state('profile.settings', {
    url: '/settings',
    templateUrl: 'js/profile/settings.html',
    controller: 'SettingsController',
    resolve: {
      user: function(AuthUser, AuthService) {
        return AuthService.getLoggedInUser().then(function(user) {
          return AuthUser.find(user._id);
        });
      }
    }
  });
});

app.controller('SettingsController', function($scope, user, DS) {
  $scope.user = user;

  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ');

  $scope.newPassword = '';

  $scope.isSeller = user.isSeller;

  $scope.submitForm = function() {
    if ($scope.becomeSeller) $scope.user.roles.push('seller');
    if ($scope.newPassword) $scope.user.password = newPassword;
    user.DSUpdate($scope.user).then(() => {
      alert('Settings updated!');
      $state.go('profile.settings', {}, {reload: true});
    });
  };
});

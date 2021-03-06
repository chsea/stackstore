app.config(function($stateProvider) {
  $stateProvider.state('profile.settings', {
    url: '/settings/:alert',
    templateUrl: 'js/profile/settings.html',
    controller: 'SettingsController'
  });
}).controller('SettingsController', function($scope, $state, $stateParams, user, DS) {
  console.log($stateParams);
  $scope.success = $stateParams.alert == 'success';
  $scope.user = user;

  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ');

  $scope.newPassword = '';

  $scope.isSeller = user.isSeller;

  $scope.submitForm = function() {
    if ($scope.becomeSeller) $scope.user.roles.push('seller');
    if ($scope.newPassword) {
      if(user.needPwReset) user.needPwReset = !user.needPwReset;
      $scope.user.password = $scope.newPassword;
    }
    user.DSUpdate($scope.user).then(() => {
			$state.go('profile.settings', {'alert': 'success'}, {reload: true});
    });
  };
});

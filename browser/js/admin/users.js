app.config(function($stateProvider) {
  $stateProvider.state('admin.users', {
    url: '/users',
    controller: 'AdminUsersController',
    templateUrl: 'js/admin/users.html',
    resolve: {
      users: (AuthUser) => AuthUser.findAll()
    }
  });
}).controller('AdminUsersController', function($scope, $state, DS, users) {
  $scope.users = users;

  $scope.resetPw = (user) => {
    user.DSUpdate({needPwReset: true}).then(() => {
      alert('Updated!');
      $state.go('admin.users', {}, {reload: true});
    });
  };

  $scope.promote = (user) => {
    user.roles.push('admin');
    user.DSUpdate({roles: user.roles}).then(() => {
      alert('Promoted!');
      $state.go('admin.users', {}, {reload: true});
    });
  };
});

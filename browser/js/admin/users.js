app.config(function ($stateProvider) {
  $stateProvider.state('admin.users', {
      url: '/users',
      controller: 'AdminUsersController',
      templateUrl: 'js/admin/users.html',
      resolve: {
        users: function(AuthUser){
          return AuthUser.findAll();
        }
      }
  });
}).controller('AdminUsersController', function($scope, $state, DS, users) {
  $scope.users = users;
  $scope.resetPw = (user) => {
    //still needs to built
  };
  $scope.promote = (user) => {
    user.roles.push('admin');
    user.DSUpdate({roles: user.roles}).then(() => {
      alert('Promoted!');
      $state.go('admin.users', {}, {reload: true});
    });
  };
});

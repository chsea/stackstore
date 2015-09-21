app.config(function ($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: 'js/admin/admin.html',
    controller: 'AdminController',
    resolve: {
      user: function(AuthUser, AuthService){
        return AuthService.getLoggedInUser().then(function(user){
          return AuthUser.find(user._id);
        });
      }
    },
    data: {
      authenticate: true,
      admin: true
    }
  });
}).controller('AdminController', function($scope, user, AuthService) {

	$scope.user = user;
});

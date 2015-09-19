app.config(function ($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: 'js/user/admin.html',
    controller: 'AdminController',
    resolve: {
      user: function(User, AuthService){
        return AuthService.getLoggedInUser().then(function(user){
          return User.find(user._id);
        });
      }
    }
  });
}).controller('AdminController', function($scope, user) {
	$scope.user = user;
});

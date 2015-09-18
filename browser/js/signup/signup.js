app.config(function ($stateProvider) {

	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: '/js/signup/signup.html',
		controller: 'SignupCtrl'
	});

});

app.controller('SignupCtrl', function ($scope, $state, User, AuthService) {
	$scope.signup = {};

	$scope.sendSignup = function () {
		if ($scope.isSeller) $scope.signup.roles = ['seller', 'buyer'];
		User.create($scope.signup)
		.then(function (createdUser) {
			var loginInfo = {email: $scope.signup.email, password: $scope.signup.password};
			return AuthService.login(loginInfo);
		})
		.then(function () {
			$state.go('home');
		})
		.catch(function (error) {
			$scope.error = error.data;
		});
	};
});

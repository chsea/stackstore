app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: '/js/signup/signup.html',
		controller: 'SignupCtrl'
	});
});

app.controller('SignupCtrl', function ($scope, $state, AuthUser, AuthService) {
	$scope.signup = {};

  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ');

	$scope.sendSignup = function () {
		if ($scope.isSeller) $scope.signup.roles = ['seller', 'buyer'];
		AuthUser.create($scope.signup)
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

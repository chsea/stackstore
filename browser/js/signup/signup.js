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
		User.create($scope.signup)
		.then(function (createdUser) {
			return AuthService.login($scope.signup);
		})
		.then(function () {
			$state.go('home');
		})
		.catch(function (error) {
			$scope.error = error.data;
		});
	};


});
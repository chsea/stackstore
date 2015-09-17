app.controller('checkoutCtrl',function($scope, $state, CartFactory, cart){
	$scope.cart = cart;

	$scope.removeTicket = function(ticketId){
		CartFactory.delete(ticketId).then(function(newCart){
			$scope.cart = newCart;
		});
	};

	$scope.checkout = {};
    $scope.error = null;

    $scope.submitCheckout = function (checkoutInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
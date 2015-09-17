app.controller('checkoutCtrl',function($scope, $state, $q, CartFactory, cart, Transaction){
	$scope.cart = cart;

	$scope.removeTicket = function(ticketId){
		CartFactory.delete(ticketId).then(function(newCart){
			$scope.cart = newCart;
		});
	};

	$scope.checkout = {
		address: {}
	};
    $scope.error = null;

    $scope.submitCheckout = function (checkoutInfo) {
        $scope.error = null;
        console.log('hi');

        CartFactory.checkout(checkoutInfo).then(console.log);
    };

});
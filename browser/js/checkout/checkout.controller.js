app.controller('checkoutCtrl',function($scope, $state, $q, CartFactory, cart){
	$scope.cart = cart;

	$scope.total = cart.reduce(function(a, b){
		return a + b.price;
	}, 0);

	$scope.removeTicket = function(ticketId){
		CartFactory.delete(ticketId).then(function(newCart){
			$scope.cart = newCart;
		});
	};

	// $scope.form = [
	// 	{ name: 'Email', model: "checkout.email"},
	// 	{ name: 'Street', model: "checkout.address.email"},
	// 	{ name: 'City', model: "checkout.address.city"},
	// 	{ name: 'State', model: "checkout.address.state"},
	// 	{ name: 'Zip', model: "checkout.address.zip"},
	// 	{ name: 'First Name', model: "checkout.firstName"},
	// 	{ name: 'Last Name', model: "checkout.lastName"},
	// 	{ name: 'Moneys'},

	// ];

	$scope.checkout = {
		address: {}
	};
    $scope.error = null;

    $scope.submitCheckout = function (checkoutInfo) {
        $scope.error = null;

        CartFactory.checkout(checkoutInfo)
        .then(function(data){
        	//do something better than go to cart
        	$state.go('cart');
        });
    };

});
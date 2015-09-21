app.controller('checkoutCtrl',function($scope, $state, $q, CartFactory, cart, AuthService){
	$scope.cart = cart;

	$scope.total = cart.reduce(function(a, b){
		return a + b.price;
	}, 0);

	$scope.removeTicket = function(ticketId){
		CartFactory.delete(ticketId).then(function(newCart){
			$scope.cart = newCart;
			$state.go('checkout', {}, {reload: true});
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

	if(AuthService.isAuthenticated()) {
		AuthService.getLoggedInUser().then(function(user){
			$scope.checkout.firstName = user.firstName;
			$scope.checkout.lastName = user.lastName;
			$scope.user = user;
			if(user.address){
				$scope.checkout.address.street = user.address.street;
				$scope.checkout.address.city = user.address.city;
				$scope.checkout.address.state = user.address.state;
				$scope.checkout.address.zip = user.address.zip;
			}
		});
	}

    $scope.submitCheckout = function (checkoutInfo) {

        CartFactory.checkout(checkoutInfo)
        .then(function(data){
        	//do something better than go to cart
        	$state.go('cart');
        });
    };

});

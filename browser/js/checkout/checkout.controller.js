app.controller('checkoutCtrl',function($scope, $state, $q, CartFactory, cart, AuthService){
	$scope.cart = cart;

	$scope.error = null;

	$scope.total = cart.reduce(function(a, b){
		return a + b.price;
	}, 0);

	$scope.checkedOut = false;

	$scope.removeTicket = function(ticketId){
		CartFactory.delete(ticketId).then(function(newCart){
			$scope.cart = newCart;
			$state.go('checkout', {}, {reload: true});
		});
	};

	$scope.checkout = {
		address: {}
	};

	if(AuthService.isAuthenticated()) {
		AuthService.getLoggedInUser().then(function(user){
			$scope.checkout.firstName = user.firstName;
			$scope.checkout.lastName = user.lastName;
			$scope.user = user;
			$scope.checkout.email = user.email;
			if(user.address){
				$scope.checkout.address.street = user.address.street;
				$scope.checkout.address.city = user.address.city;
				$scope.checkout.address.state = user.address.state;
				$scope.checkout.address.zip = user.address.zip;
			}
		});
	}

    $scope.submitCheckout = function (checkoutInfo) {

    	$scope.error = null;
    	if(!checkoutInfo.email) $scope.error = 'Invalid email address';
    	else{
	        CartFactory.checkout(checkoutInfo)
	        .then(function(data){
	        	$scope.checkedOut = data;
	        }).catch(function (error) {
				$scope.error = error.data;
			});	
    	}


    };

});

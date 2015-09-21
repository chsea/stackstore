app.controller('cartCtrl',function($scope, $state, CartFactory, cart){
	$scope.cart = cart;
	console.log(cart[0]);

	$scope.total = cart.reduce(function(a, b){
		return a + b.price;
	}, 0);

	$scope.empty = function(){
		CartFactory.empty().then(function(data){
			$scope.cart = CartFactory.getAll();
		});
	};

	$scope.removeTicket = function(ticketId){
		CartFactory.delete(ticketId).then(function(newCart){
			$scope.cart = newCart;
		});
	};
});
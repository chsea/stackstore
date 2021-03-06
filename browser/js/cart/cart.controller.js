app.controller('cartCtrl',function($scope, $state, CartFactory, cart, recs){
	$scope.cart = cart;

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
			$state.go('cart', {}, {reload: true});
		});
	};

	$scope.recs = recs;
});
app.controller('cartCtrl',function($scope, $state, CartFactory, cart){
	$scope.cart = cart;
	$scope.removeTicket = function(ticketId){
		CartFactory.delete(ticketId).then(function(newCart){
			$scope.cart = newCart;
		});
	};
});
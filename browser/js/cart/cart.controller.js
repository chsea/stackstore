app.controller('cartCtrl',function($scope, $state, CartFactory, cart){
	$scope.cart = cart;
	$scope.removeTicket = function(ticketId){
			console.log('hi');
		CartFactory.delete(ticketId).then(function(newCart){
			$scope.cart = newCart;
		});
	};
});
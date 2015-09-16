app.controller('cartCtrl',function($scope, $state, CartFactory, cart){
	console.log('cart: ', cart);
	$scope.cart = cart;
});
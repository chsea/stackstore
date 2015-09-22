app.controller('TicketsForEventCtrl',function ($scope, $state, $stateParams, CartFactory){
	$scope.addToCart = CartFactory.add;
});
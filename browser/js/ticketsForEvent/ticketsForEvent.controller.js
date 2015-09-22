app.controller('TicketsForEventCtrl',function ($scope, $state, $stateParams, TicketsForEventFactory, CartFactory){
	$scope.addToCart = CartFactory.add;
});
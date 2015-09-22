app.controller('TicketsForEventCtrl',function ($scope, $state, $stateParams, TicketsForEventFactory, CartFactory){
	// TicketsForEventFactory.getAll($stateParams.id).then(function(tickets){
	//     console.log("hey",$scope.tickets);
	// 	$scope.tickets = tickets.filter(function(ticket){
	//       return !ticket.buyer;
	//     });
	// }).then(null, function(err){
	// 	console.log(err);
	// });
	$scope.addToCart = CartFactory.add;
});
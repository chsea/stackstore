app.controller('RecommendCtrl',function($scope, $state, $stateParams, TicketsForEventFactory){
	TicketsForEventFactory.getRecs($stateParams.id).then(function(recs){
		$scope.recs = recs;
	});
});

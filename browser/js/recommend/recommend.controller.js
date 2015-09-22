app.controller('RecommendCtrl',function($scope, $state, $stateParams, Recommend){
	Recommend.find($stateParams.id).then(function(recs){
		$scope.recs = recs;
	});
});

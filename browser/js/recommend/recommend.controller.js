app.controller('RecommendCtrl',function($scope, $state, $stateParams, Recommend){
	Recommend.find($stateParams.id,{bypassCache: true}).then(recs => $scope.recs=recs );
});

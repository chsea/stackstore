// app.controller('EventCtrl',function($scope, $state, EventFactory, eventData){
// 	$scope.eventData = eventData;
// });

// JS Data version
app.controller('EventCtrl', function($scope, eventData, user) {
	$scope.loggedIn = Boolean(user);
	$scope.eventData = eventData;
});

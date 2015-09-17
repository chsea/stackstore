// app.controller('EventCtrl',function($scope, $state, EventFactory, eventData){
// 	$scope.eventData = eventData;
// });

// JS Data version
app.controller('EventCtrl', function($scope, $mdBottomSheet, eventData) {
    $scope.eventData = eventData;
    $scope.openBottomSheet = function() {
        $mdBottomSheet.show({
            template: '<md-bottom-sheet >Hello!</md-bottom-sheet>'
        });
    };
});
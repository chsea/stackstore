app.controller('EventCtrl', function ($scope, $mdBottomSheet, Event, eventData, tickets) {
    $scope.eventData = eventData;
    $scope.tickets = tickets;
    $scope.refreshEventData = function (category) {
    	Event.findAll()
    		.then(function(newData){
    			if (!category) return newData;
    			return newData.filter(e => e.EventType.category==category);
    		})
    		.then(function(filtered){
    			$scope.eventData = filtered;
    		});
    }
    $scope.openBottomSheet = function() {
        $mdBottomSheet.show({
            template: '<md-bottom-sheet >Hello!</md-bottom-sheet>'
        });
    };
});

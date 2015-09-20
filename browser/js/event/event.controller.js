app.controller('EventCtrl', function($scope, $mdBottomSheet, eventData, user, SearchQuery) {

	$scope.searchQuery = SearchQuery.query;
	$scope.resetSearchQuery = SearchQuery.reset;

	$scope.searchFilter = function (event, index, array) {
		var searchExp = SearchQuery.query() || '.',
			regex = new RegExp(searchExp, "gi"),
			date = new Date(event.date),
			searchable = [
				event.EventType.name,
				event.Venue.name,
				date.toLocaleDateString(),
				date.toDateString()
			];
		return searchable.some(function (searchableField) {
			return regex.test(searchableField);
		});
	};

	$scope.loggedIn = Boolean(user);
    $scope.eventData = eventData;
    $scope.openBottomSheet = function() {
        $mdBottomSheet.show({
            template: '<md-bottom-sheet >Hello!</md-bottom-sheet>'
        });
    };
});

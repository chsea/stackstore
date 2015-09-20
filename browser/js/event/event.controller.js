app.controller('EventCtrl', function ($scope, $mdBottomSheet, Event, eventData, tickets, SearchQuery) {

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
	};
	$scope.openBottomSheet = function() {
		$mdBottomSheet.show({
			template: '<md-bottom-sheet >Hello!</md-bottom-sheet>'
		});
	};
});

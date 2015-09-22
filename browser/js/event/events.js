app.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'js/event/events.html',
    controller: 'EventsCtrl',
    resolve: {
      user: (AuthService) => AuthService.getLoggedInUser(),
      events: (Event) => Event.findAll(),
      tickets: (Ticket) => Ticket.findAll()
    }
  });
}).controller('EventsCtrl', function($scope, Event, events, tickets, SearchQuery) {
  $scope.searchQuery = SearchQuery;
	$scope.searchFilter = function (event, index, array) {
		var searchExp = $scope.searchQuery() || '.',
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

  $scope.events = events.filter((e) => !e.expired && !e.Venue.inactive && !e.EventType.inactive);

  $scope.tickets = tickets;
  $scope.refreshEventData = function(category) {
    Event.findAll()
      .then(function(newData) {
        //whyyyy doesn't this work???
        // newDate = newDate.filter((e) => !e.Venue.inactive && !e.EventType.inactive);

        if (!category) return newData.filter((e) => !e.expired && !e.Venue.inactive && !e.EventType.inactive);
        return newData.filter(e => e.EventType.category == category && !e.expired && !e.Venue.inactive && !e.EventType.inactive);
      })
      .then(function(filtered) {
        $scope.events = filtered;
      });
  };
});

app.factory('SearchQuery', function () {
	var searchQuery = '';
	return function (newSearchQuery) {
		if (arguments.length) {
			searchQuery = newSearchQuery;
		} else {
			return searchQuery;
		}
	};
});
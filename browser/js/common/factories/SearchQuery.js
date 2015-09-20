app.factory('SearchQuery', function () {
	var searchQuery = "";
	return {
		query: function (newSearchQuery) {
			if (arguments.length) {
				searchQuery = newSearchQuery;
			} else {
				return searchQuery;
			}
		},
		reset: function () {
			searchQuery = "";
		}
	};
});
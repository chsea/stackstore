app.factory('VenueFactory', function ($http){
	function getOne(id) {
		return $http.get('/api/venues/'+id)
			.then(function(resp){return resp.data; });
	}

	return {
		getOne: getOne
	};
});
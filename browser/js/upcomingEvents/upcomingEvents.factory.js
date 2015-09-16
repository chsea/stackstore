app.factory('UpcomingEventsFactory', function ($http){
	function getAll(id) {
		return $http.get('/api/venues/'+id+'/events')
			.then(function(resp){return resp.data; });
	}
	return {
		getAll: getAll
	};
});
app.factory('EventFactory', function ($http){
	function getOne(id) {
		return $http.get('/api/events/'+id)
			.then(function(resp){return resp.data; });
	}

	return {
		getOne: getOne
	};
});
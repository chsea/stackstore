app.factory('TicketsForEventFactory', function ($http){
	function getAll(id) {
		return $http.get('/api/events/'+id+'/tickets')
			.then(function(resp){return resp.data; });
	}
	function getAlternateDates(id) {
		return $http.get('/api/events/'+id+'/dates').then(function(resp){return resp.data; });
	}
	return {
		getAll: getAll, 
		getAlternateDates: getAlternateDates
	};
});
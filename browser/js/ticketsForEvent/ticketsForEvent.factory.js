app.factory('TicketsForEventFactory', function ($http){
	function getAll(id) {
		return $http.get('/api/events/'+id+'/tickets')
			.then(function(resp){return resp.data; });
	}
	function getAlternateDates(eventTypeId) {
		return $http.get('/api/eventtypes/'+eventTypeId+'/dates').then(function(resp){return resp.data.filter(e => !e.inactive && new Date() < new Date(e.date)); });
	}
	return {
		getAll: getAll,
		getAlternateDates: getAlternateDates,
	};
});

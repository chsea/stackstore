app.factory('CartFactory', function ($http) {
    return {
    	getAll: function(){
    		return $http.get('/api/cart')
    		.then(function(cart){
    			return cart.data;
    		});
    	},

    	add: function(eventId){
    		return $http.post('/api/cart/' + eventId)
			.then(function(cart){
				return cart.data;
			});
    	},

    	delete: function(eventId){
    		return $http.delete('/api/cart/' + eventId)
			.then(function(cart){
				return cart.data;
			});
    	}

    };

});
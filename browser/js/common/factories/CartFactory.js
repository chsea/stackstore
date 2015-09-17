app.factory('CartFactory', function ($http) {
    return {
    	getAll: function(){
    		return $http.get('/api/cart')
    		.then(function(cart){
    			return cart.data;
    		});
    	},

    	add: function(ticketId){
    		return $http.post('/api/cart/' + ticketId)
			.then(function(cart){
				return cart.data;
			});
    	},

    	delete: function(ticketId){
    		return $http.delete('/api/cart/' + ticketId)
			.then(function(cart){
				return cart.data;
			});
    	}

    };

});
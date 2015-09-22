app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'cartCtrl',
        resolve: {
        	cart: function (CartFactory) {
        		return CartFactory.getAll(); 
        	},

        	recs: function(Recommend){
        		return Recommend.findAll({}, {suffix: '/cart'});
        	}
        }
    });
});
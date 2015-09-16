app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'cartCtrl',
        resolve: {
        	cart: function (CartFactory) {
        		console.log('resolve');
        		return CartFactory.getAll(); 
        	}
        }
    });
});
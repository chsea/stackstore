app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/cart/cart.html',
        controller: 'cartCtrl',
        resolve: {
        	cart: function (CartFactory) {
        		return CartFactory.getAll(); 
        	}
        }
    });
});
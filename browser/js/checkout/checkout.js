app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'checkoutCtrl',
        resolve: {
        	cart: function (CartFactory) {
        		return CartFactory.getAll(); 
        	}
        }
    });
});
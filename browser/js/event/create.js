app.config(function ($stateProvider) {
  $stateProvider.state('event.create', {
      url: '/create',
      controller: 'CreateTicketController',
      templateUrl: 'js/event/create.html',
      resolve: {
  			user: function(AuthService) {
  				return AuthService.getLoggedInUser();
  			}
      }
  });
}).controller('CreateTicketController', function($scope, $state, $stateParams, Ticket, user) {
  $scope.ticket = {
    eventProduct: $stateParams.id,
    seller: user._id,
    price: null,
    seat: null
  };

  $scope.submitForm = function() {
    $scope.ticket.seat= $scope.ticket.seat || "General Admission";
    Ticket.create($scope.ticket)
		.then(function(){
			alert('Ticket create!');
			$state.go('event', {id: $stateParams.id}, {reload: true});
		});
  };
});

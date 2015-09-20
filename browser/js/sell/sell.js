app.config(function ($stateProvider) {
  $stateProvider.state('sell', {
      url: '/sell',
      controller: 'SellController',
      templateUrl: 'js/sell/sell.html',
      resolve: {
  			user: (AuthService) => AuthService.getLoggedInUser(),
        events: (Event) => Event.findAll(),
      }
  });
}).controller('SellController', function($scope, $state, Ticket, user, events) {
  $scope.ticket = {};
  $scope.events = events;
  $scope.sellTicket = () => {
    $scope.ticket.seat = $scope.ticket.seat || "General Admission";
    $scope.ticket.seller = user._id;
    $scope.ticket.dateSelling = new Date();
    Ticket.create($scope.ticket)
		.then(() => {
			alert('Ticket created!');
			$state.go('event', {id: $scope.ticket.eventProduct}, {reload: true});
		});
  };
});

app.config(function ($stateProvider) {
  $stateProvider.state('sell', {
      url: '/sell',
      controller: 'SellController',
      templateUrl: 'js/sell/sell.html',
      resolve: {
  			user: (AuthService) => AuthService.getLoggedInUser(),
        events: (Event) => Event.findAll(),
      },
      data: {
        authenticate: true,
        seller: true
      }
  });
}).controller('SellController', function($scope, $state, Ticket, user, events) {
  $scope.ticket = {};
  $scope.events = events.filter((e) => !e.expired && !e.Venue.inactive && !e.EventType.inactive);
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

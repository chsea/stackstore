app.config(function ($stateProvider) {
  $stateProvider.state('profile.active', {
    url: '/active',
    controller: 'ActiveController',
    templateUrl: 'js/profile/active.html',
    resolve: {
      events: (Event) => Event.findAll(),
      ticketsForSale: function(Ticket, events, AuthService){
        return AuthService.getLoggedInUser()
        .then(function(user){
          return Ticket.findAll({seller: user._id});
        }).then(function(tickets) {
          return tickets.filter(function(ticket) {
            return !ticket.expired() && !ticket.sold;
          });
        });
      },
      ticketsBought: function(Ticket, events, AuthService){
        return AuthService.getLoggedInUser()
        .then(function(user){
          return Ticket.findAll({buyer: user._id});
        }).then(function(tickets) {
          return tickets.filter(function(ticket) {
            return !ticket.expired();
          });
        });
      }
    }
  });
}).controller('ActiveController', function($scope, $state, ticketsForSale, ticketsBought, DS, events) {
  $scope.ticketsForSale = ticketsForSale.map((ticket) => {
    ticket.edit = false;
    return ticket;
  });
  $scope.ticketsBought = ticketsBought;
  $scope.removeTicket = (ticket) => {
		ticket.DSDestroy()
		.then(() => {
			alert('Ticket deleted!');
			$state.go('profile.active', {}, {reload: true});
		});
	};
  $scope.updatePrice = (ticket) => {
    ticket.DSUpdate({price: ticket.price})
    .then(() => {
      alert('Price updated!');
      $state.go('profile.active', {}, {reload: true});
    });
  };
});
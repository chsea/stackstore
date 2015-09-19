app.config(function ($stateProvider) {
  $stateProvider.state('profile.active', {
      url: '/active',
      controller: 'ActiveController',
      templateUrl: 'js/user/active.html',
      resolve: {
        events: function(Event) {
          return Event.findAll();
        },
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
}).controller('ActiveController', function($scope, $state, ticketsForSale, ticketsBought, Ticket, events) {
  $scope.ticketsForSale = ticketsForSale.map((ticket) => { ticket.edit = false; return ticket; });
  $scope.ticketsBought = ticketsBought;
  $scope.removeTicket = function(ticket) {
		Ticket.destroy(ticket._id)
		.then(function(){
			alert('Ticket deleted!');
			$state.go('profile.active', {}, {reload: true});
		});
	};
  $scope.updatePrice = function(ticket) {
    Ticket.update(ticket._id, {price: ticket.price}).then(function() {
      alert('Price updated!');
      $state.go('profile.active', {}, {reload: true});
    });
  };
});

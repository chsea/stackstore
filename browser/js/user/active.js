app.config(function ($stateProvider) {
  $stateProvider.state('profile.active', {
      url: '/active',
      controller: 'ActiveController',
      templateUrl: 'js/user/active.html',
      resolve: {
        events: function(Event) {
          return Event.findAll();
        },
        users: function(User) {
          return User.findAll();
        },
        user: function(AuthService) {
          return AuthService.isAdmin();
        },
        ticketsForSale: function(Ticket, events, users, AuthService){
          return AuthService.getLoggedInUser()
          .then(function(user){
            return Ticket.findAll({seller: user._id, sold: false});
          }).then(function(tickets) {
            return tickets.filter(function(ticket) {
              return !ticket.expired();
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
}).controller('ActiveController', function($scope, $state, ticketsForSale, ticketsBought, Ticket, user) {
  console.log(user);
  $scope.ticketsForSale = ticketsForSale;
  $scope.ticketsBought = ticketsBought;
  $scope.removeTicket = function(ticket) {
		Ticket.destroy(ticket._id)
		.then(function(){
			alert('Ticket deleted!');
			$state.go('profile.active', {}, {reload: true});
		});
	};
});

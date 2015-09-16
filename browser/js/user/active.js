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
}).controller('ActiveController', function($scope, ticketsForSale, ticketsBought) {
  $scope.ticketsForSale = ticketsForSale;
  $scope.ticketsBought = ticketsBought;
});

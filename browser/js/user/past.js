app.config(function ($stateProvider) {
  $stateProvider.state('profile.past', {
      url: '/past',
      controller: 'PastController',
      templateUrl: 'js/user/past.html',
      resolve: {
        events: function(Event) {
          return Event.findAll();
        },
        users: function(User) {
          return User.findAll();
        },
        ticketsSold: function(Ticket, events, users, AuthService){
          return AuthService.getLoggedInUser()
          .then(function(user){
            return Ticket.findAll({seller: user._id});
          }).then(function(tickets) {
            return tickets.filter(function(ticket) {
              return ticket.expired() && ticket.sold;
            });
          });
        },
        ticketsUnSold: function(Ticket, events, users, AuthService){
          return AuthService.getLoggedInUser()
          .then(function(user){
            return Ticket.findAll({seller: user._id});
          }).then(function(tickets) {
            return tickets.filter(function(ticket) {
              return ticket.expired() && !ticket.sold;
            });
          });
        },
        ticketsBought: function(Ticket, events, AuthService){
          return AuthService.getLoggedInUser()
          .then(function(user){
            return Ticket.findAll({buyer: user._id});
          }).then(function(tickets) {
            return tickets.filter(function(ticket) {
              return ticket.expired();
            });
          });
        }
      }
  });
}).controller('PastController', function($scope, ticketsSold, ticketsBought, ticketsUnSold) {
  $scope.ticketsSold = ticketsSold;
    $scope.ticketsUnSold = ticketsUnSold;
  $scope.ticketsBought = ticketsBought;
});

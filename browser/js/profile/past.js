app.config(function($stateProvider) {
  $stateProvider.state('profile.past', {
    url: '/past',
    controller: 'PastController',
    templateUrl: 'js/profile/past.html',
    resolve: {
      events: (Event) => Event.findAll(),
      ticketsSold: function(Ticket, events, AuthService) {
        return AuthService.getLoggedInUser()
          .then(function(user) {
            return Ticket.findAll({seller: user._id});
          }).then(function(tickets) {
            return tickets.filter(function(ticket) {
              return ticket.expired() && ticket.sold;
            });
          });
      },
      ticketsUnSold: function(Ticket, events, AuthService) {
        return AuthService.getLoggedInUser()
          .then(function(user) {
            return Ticket.findAll({seller: user._id});
          }).then(function(tickets) {
            return tickets.filter(function(ticket) {
              return ticket.expired() && !ticket.sold;
            });
          });
      },
      ticketsBought: function(Ticket, events, AuthService) {
        return AuthService.getLoggedInUser()
          .then(function(user) {
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

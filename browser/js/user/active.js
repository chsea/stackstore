app.config(function ($stateProvider) {
  $stateProvider.state('profile.active', {
      url: '/active',
      controller: 'ActiveController',
      templateUrl: 'js/user/active.html',
      resolve: {
        events: function(Event) {
          return Event.findAll();
        },
        tickets: function(Ticket, events, User, AuthService){
          return AuthService.getLoggedInUser()
          .then(function(user){
            return Ticket.findAll({seller: user._id});
          });
        }
      }
  });
}).controller('ActiveController', function($scope, tickets) {
  console.log(tickets);
  $scope.tickets = tickets;
});

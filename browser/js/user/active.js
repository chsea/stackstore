app.config(function ($stateProvider) {
  $stateProvider.state('profile.active', {
      url: '/active',
      controller: 'ActiveController',
      templateUrl: 'js/user/active.html',
      resolve: {
        tickets: function(Ticket, Event, AuthService){
          return Event.findAll().then(function(events) {
            return AuthService.getLoggedInUser();
          }).then(function(user){
            return Ticket.findAll();
          });
        }
      }
  });
}).controller('ActiveController', function($scope, tickets) {
  $scope.tickets = tickets;
  console.log('tickets', tickets);
});

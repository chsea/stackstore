app.directive('ticket', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/ticket/ticket.html',
    scope: {
      ticket: '='
    },
    // controller: 'TicketController',
    // resolve: {
    //   user: function(AuthService){
    //     return AuthService.getLoggedInUser();
    //   }
    // }
  };
});
// .controller('TicketController', function($scope, $state, user) {
//   $scope.showSeller = function() {
//     return (($state.current.name === 'profile.past' || $state.current.name === 'profile.active') && $scope.ticket.seller._id === user._id);
//   };
// });
